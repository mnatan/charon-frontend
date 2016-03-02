package Charon::Users;
use strict;
use warnings;
use utf8;

use Digest::MD5 qw(md5_hex);

use Charon::Database;
use Database::Util;

# TODO input validation and error reporting

sub list_users {
    my ($rh_params) = @_;

    my $dbh = Charon::Database::connect();
    my $sql = 'SELECT name, surname, email FROM users WHERE is_active';
    my $users_ref = $dbh->selectall_arrayref($sql, { Slice => {} });

    return $users_ref;
}

sub user_info {
    my ($rh_params) = @_;

    my $email = $rh_params->{email};
    my $dbh = Charon::Database::connect();
    my $sql = 'SELECT name, surname, is_active FROM users WHERE email = ?';
    my $user_data = $dbh->selectrow_hashref($sql, {}, $email);

    return $user_data;
}

sub user_exists {
    my ($rh_params) = @_;
    my $user_data = user_info($rh_params);
    return !!$user_data;
}

sub add_user {
    my ($rh_params) = @_;

    my %new_user = (
        name      => $rh_params->{name},
        surname   => $rh_params->{surname},
        email     => $rh_params->{email},
        password  => md5_hex($rh_params->{password}),
        is_active => 1,
    );

    my $dbh = Charon::Database::connect();
    Database::Util::set(dbh => $dbh, table => 'users', rows => [ \%new_user ]);

    return;
}

sub remove_user {
    my ($rh_params) = @_;

    my $email = $rh_params->{email};
    my $dbh = Charon::Database::connect();
    $dbh->do('UPDATE users SET is_active = 0 WHERE email = ?', {}, $email);

    return;
}

sub auth_user {
    my ($rh_params) = @_;
    my $email    = $rh_params->{email};
    my $password = $rh_params->{password};
    
    my $dbh = Charon::Database::connect();
    my $sql = 'SELECT password FROM users WHERE is_active AND email = ?';
    my ($db_password) =
      $dbh->selectcol_arrayref($sql, { Slice => {} }, $email)->[0];

    return md5_hex($password) eq $db_password;
}

1;
