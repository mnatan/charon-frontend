#!/usr/bin/env perl

use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../lib";
use Cwd qw/realpath/;

use CharonFront::App;

CharonFront::App->to_app;
