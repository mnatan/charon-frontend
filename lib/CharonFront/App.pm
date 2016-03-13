package CharonFront::App;
use Dancer2;
use Dancer2::Core::Request;
use Dancer2::Plugin::Deferred;

use LWP::Simple::REST qw(json_post json_get);

use FindBin;
use Cwd qw/realpath/;
use YAML::XS qw/LoadFile/;

use Data::Dumper;
use feature qw/say/;

our $VERSION = '0.1';
my $BACKEND_SERVER_URL = "http://localhost:3000";

my $appdir = realpath("$FindBin::Bin/..");
my $forms  = LoadFile("$appdir/configs/forms.yml");

get '/' => sub {
    my $registrations = json_get( $BACKEND_SERVER_URL . "/registrations" );
    template 'index', { registrations => $registrations };
};

get '/login' => sub { redirect '/' };
post '/login' => sub {
    my $email      = param('usermail');
    my $pass       = param('password');
    my $return_url = param('return_url') // '/';
    my $hehe       = params;

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
    my $submitted = session('submitted');
    template 'register',
        {
        submitted => $submitted,
        form      => $forms->{registration},
        };
};
post '/register' => sub {
    my $return_url = param('return_url') // '/register';
    my $email;

    if ( keys %{ json_get("$BACKEND_SERVER_URL/user/$email") } ) {
        deferred warning => "Użytkownik $email już istnieje!";

        my $submitted = params;
        session 'submitted' => $submitted;

        redirect '/register';
    }

    my $return = json_post(
        "$BACKEND_SERVER_URL/register",
        {   name    => param('user_name'),
            surname => param('user_surname')
        }
    );

    session user => "natan";
    redirect $return_url;
};

hook before_template => sub {
    my $tokens = shift;
    $tokens->{'register_url'}   = uri_for('/register');
    $tokens->{'logout_url'}     = uri_for('/logout');
    $tokens->{'login_url'}      = uri_for('/login');
    $tokens->{'validator_path'} = uri_for('/');
};

true;
