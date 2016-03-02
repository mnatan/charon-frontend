package Database::Util;
use strict;
use warnings;

use Attribute::Handlers;
use DBI;

# Custom attribute to allow creating transactional subroutines.
# By adding this attribute to a subroutine, all dbi operations
# inside it will be a single transaction (unless explicit begin
# and commmit is used inside). AutoCommit will be turned of
# for the sub execution time (it has to if we want transactions)
# and restored to its previous state afterwards.
sub Transaction : ATTR(CODE) {
    my ($package, $symbol, $rc_orig) = @_;

    no warnings 'redefine';
    *{$symbol} = sub {
        my %args = @_;

        my $dbh     = $args{dbh};
        my $ac_orig = $dbh->{AutoCommit};
        $dbh->{AutoCommit} = 0;

        my $result_ref = eval { &$rc_orig };
        if ($@) {
            $dbh->rollback;
            croak $@;
        }

        $dbh->commit;
        $dbh->{AutoCommit} = $ac_orig;
        return $result_ref;
    };

    return;
}

my %dbh_cache;
sub connect (%) {
    my %args = @_;

    my $cache_key = _connection_cache_key(\%args);
    return $dbh_cache{$cache_key} if _cache_entry_usable($cache_key);

    $dbh_cache{$cache_key} = DBI->connect(
        "dbi:$args{dbms}:dbname=$args{name}",
        $args{user} // '',
        $args{password} // '',
        { RaiseError => 1, AutoCommit => 1 },
    ) or croak $DBI::errstr;

    return $dbh_cache{$cache_key};
}

sub list_tables {
    my $dbh = shift;
    my $sth = _table_list_sth($dbh);
    my $tables_ref = $sth->fetchall_arrayref({ TABLE_NAME => 1 });
    return map { $_->{TABLE_NAME} } @$tables_ref;
}

sub table_exists {
    my %args = @_;
    my $sth = _table_list_sth($args{dbh});
    my $tables_ref = $sth->fetchall_hashref('TABLE_NAME');
    return exists $tables_ref->{ $args{table} };
}

sub set : Transaction {
    my %args  = @_;
    my $dbh   = $args{dbh};
    my $table = $args{table};

    foreach my $row_ref (@{ $args{rows} }) {
        local $" = ',';
        my @fields    = keys %$row_ref;
        my $bind_vals = join ',', ('?') x @fields;
        my $sql       = "INSERT INTO $table (@fields) values ($bind_vals)";
        $dbh->do($sql, {}, @$row_ref{@fields}) or croak $DBI::errstr;
    }

    return;
}

sub get {
    my %args   = @_;
    my $dbh    = $args{dbh};
    my $table  = $args{table};
    my $fields = join ',', @{ $args{fields} };

    my $sql = "SELECT $fields FROM $table";
    my $result_ref = $dbh->selectall_arrayref($sql, { Slice => {} })
      or croak $DBI::errstr;
    return $result_ref;
}

sub _table_list_sth {
    my $dbh = shift;
    return $dbh->table_info((undef) x 3, 'TABLE');
}

sub _cache_entry_usable {
    my $key = shift;
    return unless defined (my $dbh = $dbh_cache{$key});
    return unless $dbh->isa('DBI::db');
    return unless $dbh->ping;
    return 1;
}

sub _connection_cache_key {
    my $rh_args = shift;
    my $user = $rh_args->{user} // 'NO_USER';
    return join q[<:!'"*&^:)], @$rh_args{qw(dbms name )}, $user;
}

1;

__END__
=head1 NAME

Database::Util - general purpose utilities for working with databases.

=head1 DESCRIPTION

This module implements common database operations (using DBI), like
connecting, getting and inserting data, etc.

=head1 FUNCTIONS

=head2 connect

Named parameters:

=over 4

=item name - Name of the database to connect to.

=item dbms - Database Management System in use, for ex. "SQLite".

=item user - Username to use for the connection (Optional).

=item password - Password for the given user (Optional).

=back

Connect to a database and return a DBI database handle. User and password
can be skipped if the database doesn't require login, like SQLite or
provides an anonymous connection.

=head2 list_tables($dbh)

Return a list of all tables if database connected to by the handle $dbh.

=head2 table_exists

Named parameters:

=over 4

=item dbh - DBI database handle of the target database.

=item table - Name of table to check for existence.

=back

Check if table exists in database connected to with the given handle.
Return true if the table exists, false otherwise.

=head2 insert

Named parameters:

=over 4

=item dbh - DBI database handle of the target database.

=item table - Name of target table for inserting data.

=item rows - Reference to an array of hashes representing the data to insert.

=back

Insert data to a database table. This is a transaction.

=cut
