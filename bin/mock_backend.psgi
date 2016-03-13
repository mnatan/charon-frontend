#!/usr/bin/env perl

use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../lib";

use JSON::XS;

use FindBin;
use Cwd qw/realpath/;
use YAML::XS qw/LoadFile/;

#use CharonFront::App;

my $BACKEND_SERVER_URL = "http://localhost:3000";
my $appdir             = realpath("$FindBin::Bin/..");
my $Mocks              = LoadFile("$appdir/configs/mocks.yml");

use Test::Mock::Simple;

sub mock_request {
    my ($type) = @_;
    return sub {
        my ($url) = @_;
        $url =~ s/$BACKEND_SERVER_URL/$type:/;
        for my $key ( keys %$Mocks ) {
            if ( $url =~ $key ) {
                return $Mocks->{$key};
            }
        }
        }
}

my $mock = Test::Mock::Simple->new( module => 'CharonFront::App' );
$mock->add( json_get  => mock_request("get") );
$mock->add( json_post => mock_request("post") );

CharonFront::App->to_app;
