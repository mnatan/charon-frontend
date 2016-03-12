package CharonFront::App;
use Dancer2;
use Dancer2::Plugin::Auth::Tiny;
use Dancer2::Plugin::Deferred;

use LWP::Simple::REST qw(json_post json_get);

use Data::Dumper;

our $VERSION = '0.1';
my $BACKEND_SERVER_URL = "http://localhost:3000";

get '/' => sub {
    my $registrations = json_get( $BACKEND_SERVER_URL . "/registrations" );
    template 'index', { registrations => $registrations };
};

get '/login' => sub { redirect '/' };
post '/login' => sub {
    my $email      = param('usermail');
    my $pass       = param('password');
    my $return_url = param('return_url') // '/';

    unless (
        json_post(
            "$BACKEND_SERVER_URL/authorize",
            { email => $email, password => $pass }
        )->{ok} == 1
        )
    {
        deferred error => "Niepoprawny użytkownik lub hasło!";
        redirect '/login';
    }

    my $user_data = json_get("$BACKEND_SERVER_URL/user/$email");

    session user      => $user_data->{name};
    session role      => $user_data->{role};
    session logged_in => 1;

    deferred info => "Użytkownik $email został poprawnie zalogowany.";
    redirect $return_url;
};

get '/logout' => sub {
    my $return_url = param('return_url') // '/';
    app->destroy_session;
    deferred info => "Pomyślnie wylogowano użytkownika: " . session 'user';
    redirect $return_url;
};

get '/register' => sub {
    template 'register',
        {
        form => [
            {   name       => "Imię",
                type       => "text",
                additional => [],
            },
            {   name => "Nazwisko",
                type => "text",
            },
            {   name => "Email",
                type => "email",
            },
            {   name => "Hasło",
                type => "password",
            },
            {   name => "Powtórz hasło",
                type => "password",
            },
        ],
        };
};

post '/register' => sub {
    my $return_url = param('return_url') // '/';
    my $email      = param('usermail');
    my $pass       = param('password');
    my $pass_c     = param('password_confirm');

    if ( $pass ne $pass_c ) {
        deferred warning => "Hasła nie zgadzają się!";
        redirect $return_url;
    }
    if ( keys %{ json_get("$BACKEND_SERVER_URL/user/$email") } ) {
        deferred warning => "Użytkownik $email już istnieje!";
        redirect $return_url;
    }

    json_post(
        "$BACKEND_SERVER_URL/register",
        {   email    => $email,
            password => $pass,
            name     => param('user_name'),
            surname  => param('user_surname')
        }
    );

    session user => $email;
    redirect '/';
};

hook before_template => sub {
    my $tokens = shift;
    $tokens->{'register_url'} = uri_for('/register');
    $tokens->{'logout_url'}   = uri_for('/logout');
    $tokens->{'login_url'}    = uri_for('/login');
};

true;
