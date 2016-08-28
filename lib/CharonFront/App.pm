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

    my $user_data = backend_get("$API{users}/$login");

    session userid    => $backend_auth->{userid};
    session token     => $backend_auth->{token};
    session role      => $user_data->{role};
    session name      => $user_data->{name} . " " . $user_data->{surname};
    session logged_in => 1;

    deferred success => "Użytkownik "
        . session("name")
        . " został zalogowany.";
    redirect $return_url;
};

get '/logout' => sub {
    my $return_url = param('return_url') // '/';
    app->destroy_session;
    deferred info => "Pomyślnie wylogowano użytkownika: " . session 'user';
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
        = backend_post( $API{register_user}, $submitted );

    if ( $backend_registration->{status} eq 500 ) {
        deferred error => $backend_registration->{exception};
        redirect '/register';
    }

    deferred success => "Użytkownik "
        . param("name") . " "
        . param("surname")
        . " został pomyślnie zarejestrowany.";

    #TODO login user?

    redirect "/";
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

get '/cart' => sub {
    my $cart = backend_get( $API{cart} );

    # TODO: add cart to backend
    #my $cart;
    #if ( session "logged_in" ) {
        #$cart = backend_get( $API{cart},
            #{ userid => session("userid"), token => session("token") } );
    #}
    template 'cart', { cart => $cart, };
};

get '/timeline' => sub {
    my $timeline = backend_get( $API{timeline} );
    # TODO: add timeline to backend
    #my $timeline;
    #if ( session "logged_in" ) {
        #$timeline = backend_get( $API{timeline},
            #{ userid => session("userid"), token => session("token") } );
    #}
    template 'timeline', { timeline => $timeline, };
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
get '/directors/my_fields' => sub {
    my $fields = backend_get( $API{my_fields} );

    # TODO: add my_fields to backend
    #my $cart;
    #if ( session "logged_in" ) {
        #$cart = backend_get( $API{cart},
            #{ userid => session("userid"), token => session("token") } );
    #}
    template 'my_fields', { fields => $fields, };
};

get '/directors/create_field' => sub {
    template 'create_field', { form => $forms->{field}, };
};

post '/directors/create_field' => sub {
    my $return_url = param('return_url') // '/';
    my $create_field
        = backend_post( $API{create_field} . session("userid"), params);

    #if ( $create_field->{status} eq 500 ) {
        #deferred error => $create_field->{exception};
        #redirect '/field';
    #}

    #deferred success => "Kierunek"
        #. param("field_name") . " "
        #. " został stworzony.";

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
