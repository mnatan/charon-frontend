package CharonFront::App;
use Dancer2;
use Dancer2::Plugin::Auth::Tiny;
use Data::Dumper;
use Encode qw(decode);

our $VERSION = '0.1';

get '/' => sub {
    my $registrations = "LWP get!";
    template 'index', { fields => $registrations };
};

post '/field_register/:fieldid' => needs login => sub {
    my $email   = session('user');
    my $fieldid = param('fieldid');
    Charon::Registrations::add({ email => $email, fieldid => $fieldid });
    redirect '/';
};

get '/login' => sub { redirect '/' };

post '/login' => sub {
    my $email      = param('usermail');
    my $pass       = param('password');
    my $return_url = param('return_url') // '/';

    unless (Charon::Users::auth_user({ email => $email, password => $pass })) {
        redirect '/login';
    }

    my $user_data = Charon::Users::user_info({ email => $email });

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
    return 'USER EXISTS' if Charon::Users::user_exists({ email => $email });

    Charon::Users::add_user({
        email    => $email,
        password => $pass,
        name     => param('user_name'),
        surname  => param('user_surname')
    });

    session user => $email;
    redirect '/';
};

true;
