package Charon::Database;
use strict;
use warnings;

use File::Spec::Functions qw(catfile);

use Charon::Config qw(CHARON_ROOT);
use Database::Util;

sub connect {
    my $db_file = catfile(CHARON_ROOT, 'charon-db.sqlite');
    return Database::Util::connect(name => $db_file, dbms => 'SQLite');
}

1;
