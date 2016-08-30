package CharonFront::App;
use Dancer2;
use Dancer2::Core::Request;
use Dancer2::Core::Role::ConfigReader;
use Dancer2::Plugin::Deferred;

use Data::Dumper;
use feature qw/say/;

use FindBin;
use Cwd qw/realpath/;
use lib realpath("$FindBin::Bin/..");

use YAML::XS qw/LoadFile/;

use CharonFront::RESTUser qw(backend_post backend_get);

our $VERSION = '0.1';

my $appdir = realpath("$FindBin::Bin/..");
my $forms  = LoadFile("$appdir/configs/forms.yml");
my %API    = %{ LoadFile("$appdir/configs/api.yml") };

# ========= Common pages ========= #

get '/' => sub {
    my $registrations = backend_get( $API{registrations} );
    template 'index', { registrations => $registrations };
};

get '/login' => sub { redirect '/' };
post '/login' => sub {
    my $login      = param('login');
    my $pass       = param('password');
    my $return_url = param('return_url') // '/';

    my $backend_auth = backend_post( $API{authorize}, scalar params );

    unless ( defined $backend_auth->{token} ) {
        deferred error => "Niepoprawny użytkownik lub hasło!";
        redirect $return_url;
    }

    #my $user_data = backend_get("$API{users}/$login");

    session userid    => $backend_auth->{userid};
    session token     => $backend_auth->{token};
    session role      => $backend_auth->{role};
    #session name      => $user_data->{name} . " " . $user_data->{surname};
    session logged_in => 1;

    deferred success => "Użytkownik "
        . session("name")
        . " został zalogowany.";
    redirect $return_url;
};

get '/logout' => sub {
    my $return_url = param('return_url') // '/';
    app->destroy_session;
    deferred info => "Pomyślnie wylogowano.";
    redirect $return_url;
};

get '/register' => sub {
    template 'register', { form => $forms->{registration}, };
};

post '/register' => sub {
    my $submitted = params;
    session 'submitted' => $submitted;

    if ( param("password") ne param("password_c") ) {
        deferred error => "Hasła nie zgadzają się!";
        redirect '/register';
    }

    my $backend_registration
        = backend_post( $API{register}, $submitted );

    if ( $backend_registration->{status} =~ /2\d\d/ ) {
        deferred success => "Użytkownik "
            . param("name") . " "
            . param("surname")
            . " został pomyślnie zarejestrowany.";
    } else {
        deferred error => $backend_registration->{exception};
        redirect '/register';
    }

    redirect "/";
};

get '/registration_info/:fieldid' => sub {
    my $info = backend_get( $API{registration_info} . param('fieldid') );
    my $timeline = backend_get( $API{timeline} );
    template 'registration_info', { form => $forms->{registration_info}, 
                                    info => $info, timeline => $timeline };
};

get '/contact' => sub {
    template 'contact', { form => $forms->{contact_details}, };
};

get '/faq' => sub {
    my $faq = backend_get( $API{faq} );
	foreach my $category (@{$faq}){
		foreach my $question (@{$category->{questions}}){
			$question->{id} = $question->{question} =~ s/\s//rg;
		}
	}
	print Dumper($faq);
    template 'faq', { questions => $faq, };
};


# ========= Applicant pages ========= #

get '/students/cart' => sub {
    my $cart;
    if ( session "logged_in" ) {
        my $cart_url = '/students/' . session("userid") . '/cart';
        $cart = backend_get( $cart_url );
    }
    template 'cart', { cart => $cart, };
};

post '/register_on_field' => sub {
    my $return_url = param('return_url') // '/';
    my $cart_url= '/students/' . session("userid") . '/cart';

    my $register
        = backend_post( $cart_url, param('fieldid') );

    deferred success => "Zostałeś pomyślnie zapisany!";

    redirect $return_url;
};


get '/students/timeline' => sub {
    my $timeline;
    if ( session "logged_in" ) {
        my $timeline_url = '/students/' . session("userid") . '/timeline';
        $timeline = backend_get( $timeline_url );
    }

    template 'deadlines', { timeline => $timeline, };
};

# ========= Director pages ========= #

get '/userlist' => sub {
    my $users;
    if ( session "logged_in" ) {
        $users = backend_get( $API{users},
            { userid => session("userid"), token => session("token") } );
    }
    template "userlist", { users => $users };
};

# TODO: add director's id
# must be available only if director logged in
get '/directors/fields' => sub {
    my $fields;
    if ( session "logged_in" ) {
        my $fields_url = '/students/' . session("userid") . '/fields';
        $fields = backend_get( $fields_url );
    }

    template 'my_fields', { fields => $fields, };
};

get '/directors/create_field' => sub {
    my $directors = backend_get( $API{directors_list} );
    template 'create_field', { form => $forms->{field}, directors => $directors };
};

post '/directors/create_field' => sub {
    my $return_url = param('return_url') // '/';
    my $field_url = '/directors/' . session("userid") . '/fields';
    my $create_field
        = backend_post( $field_url, params);

    redirect $return_url;
};

get '/directors/create_instance' => sub {
    my $my_fields;
    #if ( session "logged_in" ) {
        $my_fields = backend_get( $API{my_fields} );
    #}
    template 'create_instance', { form => $forms->{instance}, my_fields => $my_fields};
};

post '/directors/create_instance' => sub {
    my $return_url = param('return_url') // '/';
    my $create_instance
        = backend_post( $API{create_instance} . session("userid"), params);

    #if ( $create_instance->{status} eq 500 ) {
        #deferred error => $create_instance->{exception};
        #redirect '/create_instance';
    #}

    #deferred success => "Kierunek"
        #. param("instance_name") . " "
        #. " został stworzony.";

    redirect $return_url;
};

hook before_template => sub {
    my $tokens = shift;

    $tokens->{contact_url}    = uri_for('/contact');
    $tokens->{faq_url}        = uri_for('/faq');
    $tokens->{register_url}   = uri_for('/register');
    $tokens->{logout_url}     = uri_for('/logout');
    $tokens->{login_url}      = uri_for('/login');
    $tokens->{validator_path} = uri_for('/');
};

true;
