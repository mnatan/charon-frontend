#!/usr/bin/env perl

use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../lib";
use CharonFront::LESS qw(generate_css);

use JSON::XS;

use FindBin;
use Cwd qw/realpath/;
use YAML::XS qw/LoadFile/;

use Data::Dumper;

# use CharonFront::App;

my $appdir             = realpath("$FindBin::Bin/..");
my $config             = LoadFile("$appdir/config.yml");
my $Mocks              = LoadFile("$appdir/configs/mocks.yml");
my $BACKEND_SERVER_URL = $config->{BACKEND_SERVER_URL};

use Test::Mock::Simple;

my $mock = Test::Mock::Simple->new( module => 'CharonFront::App' );

my %originals = (
    get  => \&CharonFront::App::backend_get,
    post => \&CharonFront::App::backend_post,
);

sub mock_request {
    my ($type) = @_;
    return sub {
        my ($url) = @_;
        $url =~ s/^/$type:/;
        for my $key ( keys %$Mocks ) {
            if ( $url =~ $key ) {
                my $out = $Mocks->{$key};

                print "--------- " . uc $type . " -----------\n";
                print "$key\n";
                print Dumper $out;
                print "--------  /" . uc $type . "  ----------\n";

                return $out;
            }
        }

		# implemented, try to really ask backend
		$originals{$type}->(@_);
        }
}

$mock->add( backend_get  => mock_request("get") );
$mock->add( backend_post => mock_request("post") );

generate_css($appdir);

CharonFront::App->to_app;
