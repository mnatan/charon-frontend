#!/usr/bin/env perl

use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../lib";

use JSON::XS;

#use CharonFront::App;

my $BACKEND_SERVER_URL = "http://localhost:3000";

my $Mocks = {
    "get:/registrations" => [
        {   name       => "Testowanie",
            due        => "20/04/2016",
            registered => 20,
            limit      => 30,
        },
        {   name       => "Automatyzacja",
            due        => "22/04/2016",
            registered => 27,
            limit      => 30,
        },
    ],
    "get:/user/.*" => {
        name   => "Marcin Natanek",
        email  => 'marcin.natanek@uj.edu.pl',
        active => 1,
        role   => "admin",
    },
    "post:/authorize" => { ok => 1 },
};

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
