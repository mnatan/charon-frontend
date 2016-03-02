package Database::Migration;
use strict;
use warnings;
use feature qw(say state);
use Carp qw(croak);
use YAML::XS;
use Digest::MD5 qw(md5_hex);

use constant {
    MIGRATION_TABLE_NAME => 'MIGRATION_CHANGELOG',
    DBI_TABLE_NAME_INDEX => 2,
};

sub update {
    my %arg = @_;
    my ($dbh, $changelog) = @arg{qw(dbh changelog)};
    my $checksum_match = _forced_match($arg{force});

    _setup_migration_table($dbh);
    my $db_changelog_ref = _get_db_changelog($dbh);
    my $mig_ref          = _read_changelog($changelog);
    _verify_applied_migrations($db_changelog_ref, $mig_ref, $checksum_match);

    my $changesets_todo = _get_unapplied($db_changelog_ref, $mig_ref);
    if (@$changesets_todo) {
        _make_migration($dbh, $changesets_todo, 'update', $arg{count});
    }
    else {
        say 'No new changesets to apply';
    }

    return;
}

sub rollback {
    my %arg = @_;
    my ($dbh, $changelog) = @arg{qw(dbh changelog)};
    my $checksum_match = _forced_match($arg{force});

    _setup_migration_table($dbh);
    my $db_changelog_ref = _get_db_changelog($dbh);
    if (not @$db_changelog_ref) {
        say 'No changesets to rollback';
        return;
    }

    my $mig_ref = _read_changelog($changelog);
    _verify_applied_migrations($db_changelog_ref, $mig_ref, $checksum_match);
    my @changesets_todo =
      reverse @{ _get_applied($db_changelog_ref, $mig_ref) };
    _make_migration($dbh, \@changesets_todo, 'rollback', $arg{count});

    return;
}

# Generate a comparison function depending on the argument.
# If false (no force): generate regular string comparison
# If true  (force):    generate a function which always returns true
sub _forced_match {
    my $forced = shift;
    return $forced ? sub { $_[0] eq $_[1] } : sub { 1 };
}

# Check for existence of a migration table in the given database.
# Create an empty one if not found.
sub _setup_migration_table {
    my $dbh = shift;

    my $tables_sth = $dbh->table_info((undef) x 3, 'TABLE');
    while (my $row_ref = $tables_sth->fetchrow_arrayref) {
        my $table_name = $row_ref->[DBI_TABLE_NAME_INDEX];

        # Migration table already exists - finish
        return if $table_name eq MIGRATION_TABLE_NAME;
    }

    # Migration table not found, create it
    my $table_name = MIGRATION_TABLE_NAME;
    my $result     = $dbh->do(
        qq{
        CREATE TABLE $table_name (
            changeset_id UNSIGNED INT,
            changeset_checksum VARCHAR(32) NOT NULL,

            PRIMARY KEY (changeset_id)
        );
    }
    ) or die $dbh->errstr;

    return;
}

# Retrieve all applied changeset ids and checksums
# from the database migration table.
sub _get_db_changelog {
    my $dbh = shift;

    my $table_name = MIGRATION_TABLE_NAME;
    my $sql        = "SELECT changeset_id, changeset_checksum FROM $table_name";
    my $rah_changelog = $dbh->selectall_arrayref($sql, { Slice => {} });

    return $rah_changelog;
}

# Read a YAML changelog and validate it. If nothing went wrong,
# the changelog is returned as an array of hashes.
sub _read_changelog {
    my $filename = shift;

    my (@changelog, %ids);
    open my $CHANGELOG, '<', $filename or croak "$filename: $!";
    local $/ = "---\n"; # read by YAML variables instead of single lines
    while (<$CHANGELOG>) {
        chomp;
        my $changeset_ref = YAML::XS::Load($_);
        _validate_changeset($changeset_ref);

        my $id = $changeset_ref->{id};
        croak "Duplicate id: $id" if exists $ids{$id};
        undef $ids{$id};

        push @changelog, $changeset_ref;
    }
    close $CHANGELOG;

    return \@changelog;
}

# Make validation checks of a single changeset
sub _validate_changeset {
    my $changeset_ref = shift;

    my @fields = qw(id name update rollback);
    foreach my $field (@fields) {
        croak "Missing field '$field' in changeset"
          unless exists $changeset_ref->{$field};
    }

    my ($id, $name, $sql, $rollback) = @$changeset_ref{@fields};
    croak "Non-integer id: $id" unless $id =~ /\A\d+\z/;
    croak "Empty name"          unless length $name > 0;
    croak "Empty SQL"           unless length $sql > 0;
    croak "Empty rollback"      unless length $rollback > 0;

    return;
}

# Compare the database changelog with given migration set.
# All migration from the database should also be present
# in the migration set and their checksums should match.
#
# The checksum comparison function is passed as an argument
# to allow skipping of checksum checking.
sub _verify_applied_migrations {
    my ($db_changelog_ref, $mig_changelog_ref, $rc_checksum_match) = @_;

    my %db_change_checksum;
    foreach (@$db_changelog_ref) {
        my ($id, $checksum) = @$_{qw(changeset_id changeset_checksum)};
        $db_change_checksum{$id} = $checksum;
    }

    my $match_count = 0;
    foreach my $mig_changeset_ref (@$mig_changelog_ref) {
        my $id = $mig_changeset_ref->{id};
        next unless exists $db_change_checksum{$id};    # unapplied changeset

        my $db_checksum  = $db_change_checksum{$id};
        my $mig_checksum = _changeset_checksum($mig_changeset_ref);
        croak "Checksum mismatch for changset id $id"
          unless $rc_checksum_match->($db_checksum, $mig_checksum);

        ++$match_count;
    }

    # Ids are checked for uniqueness in _read_changelog and database
    # changeset ids are the primary key. Therefore, none of them
    # should match twice. If the number of matches is less than
    # number of records in db - some changesets are missing from
    # the migration changelog.
    croak "Already applied migration missing from migration changelog"
      if $match_count != @$db_changelog_ref;

    return;
}

# Calculate the checksum of a single changset
sub _changeset_checksum {
    my $changeset_ref = shift;

    # Name change is not a problem, so it's excluded from the checksum
    my $joined = join q[<:"!|!':>], @$changeset_ref{qw(id update rollback)};
    my $md5sum = md5_hex($joined);

    return $md5sum;
}

# Return all changesets which appear in the migration set
# but not in the database.
sub _get_unapplied {
    my ($db_changelog_ref, $mig_ref) = @_;

    my %db_changset;
    undef $db_changset{ $_->{changeset_id} } foreach @$db_changelog_ref;

    my @unapplied = grep { not exists $db_changset{ $_->{id} } } @$mig_ref;
    return \@unapplied;
}

# Get corresponding migrations for every applied changeset
# in the database changelog.
sub _get_applied {
    my ($db_changelog_ref, $mig_ref) = @_;

    my %db_changset;
    undef $db_changset{ $_->{changeset_id} } foreach @$db_changelog_ref;

    my @applied = grep { exists $db_changset{ $_->{id} } } @$mig_ref;
    return \@applied;
}

# Execute a migration, either an update or a rollback.
# If executed successfuly, report this to stdout and save
# changset data in database changelog.
sub _make_migration {
    my ($dbh, $changelog_ref, $migration_type, $limit) = @_;

    state $migration_config_ref = {
        update => {
            sql_field           => 'update',
            rc_update_changelog => \&_add_changeset_to_db_changelog,
        },
        rollback => {
            sql_field           => 'rollback',
            rc_update_changelog => \&_remove_changeset_from_db_changelog,
        },
    };

    my $config_ref          = $migration_config_ref->{$migration_type};
    my $sql_field           = $config_ref->{sql_field};
    my $rc_update_changelog = $config_ref->{rc_update_changelog};

    my $changes_made = 0;
    foreach my $changeset_ref (@$changelog_ref) {
        last if defined $limit and $changes_made >= $limit;

        my $sql = $changeset_ref->{$sql_field};
        $dbh->do($sql) or croak $dbh->errstr;
        $rc_update_changelog->($dbh, $changeset_ref);
        say "Changeset $changeset_ref->{id}: $migration_type successful";

        ++$changes_made;
    }

    return;
}

# Insert given changset to the database changelog.
sub _add_changeset_to_db_changelog {
    my ($dbh, $changeset_ref) = @_;

    my $id         = $changeset_ref->{id};
    my $checksum   = _changeset_checksum($changeset_ref);
    my $table_name = MIGRATION_TABLE_NAME;
    $dbh->do(
        qq{
        INSERT INTO $table_name (changeset_id, changeset_checksum)
        VALUES (?, ?)
    }, {}, $id, $checksum
    ) or die $dbh->errstr;

    return;
}

# Remove a changeset from database changelog,
# checksum is assumed to be already checked for mismatch.
sub _remove_changeset_from_db_changelog {
    my ($dbh, $changeset_ref) = @_;

    my $id         = $changeset_ref->{id};
    my $table_name = MIGRATION_TABLE_NAME;
    $dbh->do(
        qq{
        DELETE FROM $table_name WHERE changeset_id = ?
    }, {}, $id
    ) or die $dbh->errstr;

    return;
}

1;

__END__
=head1 NAME

Database::Migration - make simple database migrations.

=head1 DESCRIPTION

This module allows for incremental database updates and rollbacks.
It uses a YAML-based config file to specify migrations and a single
table in target database (MIGRATION_CHANGELOG) to store information
about applied updates.

=head1 FUNCTIONS

All functions take named arguments and validate the changelog before
proceeding.

Normally, if an already applied changeset changed between updates,
its checksum won't match and both functions will throw an error.
This behaviour can be disabled by setting force to true.

=head1 THE CONFIGURATION FILE

The configuration consists of multiple YAML hashes (not an array).
Entries are separated with a triple dash ("---"). Each entry should
have four fields:

=over 4

=item *

id - a unique id for the changset

=item *

name - a concise description of the changeset

=item *

sql - SQL to execute for the change to take place

=item *

rollback - SQL to reverse the change

=back

Example:

    id: 1
    name: Create the `users` table
    sql: |
      CREATE TABLE users (
          userid  INT PRIMARY KEY,
          name    TEXT NOT NULL,
          surname TEXT NOT NULL
      );
    rollback: |
      DROP TABLE users;
    ---
    id: 2
    name: Add first users into the database
    sql: |
      INSERT INTO users VALUES
        (1, 'John', 'Willson'),
        (2, 'Mark', 'Drake');
    rollback: |
      DELETE FROM users WHERE userid IN (1, 2);
    ---

=head2 update

=over 4

=item dbh [DBI::db] (Mandatory)

DBI database handle for the target database.

=item changelog [FILENAME] (Mandatory)

Filename of the YAML changelog file.

=item count [INT]

Number of updates to perform.

=item force [BOOL]

If true, changeset checksum mismatch will be ignored.

=back

This function runs all unapplied updates on the target database
(if count is not specified) or the number specified by count.

=head2 rollback

=over 4

=item dbh [DBI::db] (Mandatory)

DBI database handle for the target database.

=item changelog [FILENAME] (Mandatory)

Filename of the YAML changelog file.

=item count [INT]

Number of updates to roll back.

=item force [BOOL]

If true, changeset checksum mismatch will be ignored.

=back

This function rolls back [count] last updates and removes their
entries from the database changelog. If count is not specified,
B<everything will be rolled back>.

=cut
