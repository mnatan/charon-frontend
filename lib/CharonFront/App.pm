package CharonFront::App;
use Dancer2;
use Dancer2::Plugin::Auth::Tiny;
use Data::Dumper;
use Encode qw(decode);

use Dancer2::Plugin::Deferred;

use LWP::Simple::REST qw(http_post http_get);

our $VERSION = '0.1';

my $BACKEND_SERVER_URL = "http://localhost:3000";

get '/' => sub {
    my $registrations = http_get( $BACKEND_SERVER_URL . "registrations" );
    $registrations = [
        {   name => "Testowanie",
            due  => "20/04/2016",
        },
        {   name => "Automatyzacja",
            due  => "22/04/2016",
        },
    ];
    template 'index', { registrations => $registrations };
};

get '/hehe' => sub {
    deferred error => "HIDDEN FEATURE YAY";
    redirect '/hehe2';
};
get '/hehe2' => sub {
    template 'index';
};

post '/field_register/:fieldid' => needs login => sub {
    my $email   = session('user');
    my $fieldid = param('fieldid');
    Charon::Registrations::add( { email => $email, fieldid => $fieldid } );
    redirect '/';
};

get '/login' => sub { redirect '/' };

post '/login' => sub {
    my $email      = param('usermail');
    my $pass       = param('password');
    my $return_url = param('return_url') // '/';

    unless (
        Charon::Users::auth_user( { email => $email, password => $pass } ) )
    {
        redirect '/login';
    }

    my $user_data = Charon::Users::user_info( { email => $email } );

    session user      => $email;
    session role      => $user_data->{role};
    session logged_in => 1;
    redirect $return_url;
};

get '/logout' => sub {
    app->destroy_session;
    redirect '/';
};

get '/register' => sub { template 'register' };

post '/register' => sub {
    my $email  = param('usermail');
    my $pass   = param('password');
    my $pass_c = param('password_confirm');

    return 'PASSWORD MISMATCH' if $pass ne $pass_c;
    return 'USER EXISTS' if Charon::Users::user_exists( { email => $email } );

    Charon::Users::add_user(
        {   email    => $email,
            password => $pass,
            name     => param('user_name'),
            surname  => param('user_surname')
        }
    );

    session user => $email;
    redirect '/';
};

true;
