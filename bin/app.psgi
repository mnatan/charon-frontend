#!/usr/bin/env perl

use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../lib";
use CharonFront::LESS qw(generate_css);
use CharonFront::App;

my $appdir = realpath("$FindBin::Bin/..");
generate_css($appdir);

CharonFront::App->to_app;
