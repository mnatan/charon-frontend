package CharonFront::App;
use Dancer2;
use Dancer2::Core::Request;
use Dancer2::Plugin::Deferred;
use Dancer2::Core::Role::ConfigReader;

BEGIN {    # FIXME dirty hack for annoying include errors
    use FindBin;
    use Cwd qw/realpath/;
    my $appdir = realpath("$FindBin::Bin/..");
    unshift @INC, $appdir;
}

use CharonFront::RESTUser qw(json_post json_get);

use FindBin;
use Cwd qw/realpath/;
use YAML::XS qw/LoadFile/;

use Data::Dumper;
use feature qw/say/;

our $VERSION = '0.1';
my $DEBUG              = 1;
my $BACKEND_SERVER_URL = setting("BACKEND_SERVER_URL");

my $appdir = realpath("$FindBin::Bin/..");
my $forms  = LoadFile("$appdir/configs/forms.yml");

get '/' => sub {
    my $registrations = json_get( $BACKEND_SERVER_URL . "/registrations" );
    print Dumper $registrations if $DEBUG;
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
    print Dumper $user_data if $DEBUG;

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
    my $return_url = param('return_url') // '/';

    my $submitted = params;
    session 'submitted' => $submitted;
    print Dumper $submitted if $DEBUG;

    if ( param("password") ne param("password_c") ) {
        deferred error => "Hasła nie zgadzają się!";
        redirect '/register';
    }

    #FIXME json_post umiera z braku contentu w ramce http
    my $backend_registration
        = json_post( "$BACKEND_SERVER_URL/users/register", $submitted );
    print Dumper $backend_registration if $DEBUG;

    if ( $backend_registration->{status} eq 500 ) {
        deferred error => $backend_registration->{exception};
        redirect '/register';
    }

    deferred success => "Użytkownik "
        . param("name") . " "
        . param("surname")
        . " został pomyślnie zarejestrowany.";

    #TODO login user?

    redirect $return_url;
};

hook before_template => sub {
    my $tokens = shift;

    # just use [% backend_url %] in tt files
    $tokens->{backend_url}    = uri_for($BACKEND_SERVER_URL);
    $tokens->{register_url}   = uri_for('/register');
    $tokens->{logout_url}     = uri_for('/logout');
    $tokens->{login_url}      = uri_for('/login');
    $tokens->{validator_path} = uri_for('/');
};

true;
