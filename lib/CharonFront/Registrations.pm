package Charon::Registrations;
use strict;
use warnings;

use Charon::Database;
use Database::Util;

sub list {
    my $rh_params = shift; 

    my $dbh = Charon::Database::connect();
    my $sql = <<'ENDSQL';
        SELECT
            fieldid,
            name,
            description,
            place_limit,
            COUNT(registrations.fieldid) AS registered
        FROM
            fields
            LEFT JOIN registrations USING (fieldid)
        GROUP BY fieldid
ENDSQL

    my $reg_ref = $dbh->selectall_arrayref($sql, { Slice => {} });
    return $reg_ref;
}

sub add {
    my $rh_params = shift;
    my $email     = $rh_params->{email};
    my $fieldid   = $rh_params->{fieldid};

    my $dbh = Charon::Database::connect();
    my $new = { user_email => $email, fieldid => $fieldid };
    Database::Util::set(dbh => $dbh, table => 'registrations', rows => [$new]);

    return;
}

1;
