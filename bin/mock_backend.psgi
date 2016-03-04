#!/usr/bin/env perl

use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../lib";

use JSON::XS;

#use CharonFront::App;

my $BACKEND_SERVER_URL = "http://localhost:3000";

my $Mocks = {
    "/registrations" => [
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
};

use Test::Mock::Simple;
my $mock = Test::Mock::Simple->new( module => 'CharonFront::App' );
$mock->add(
    http_get => sub {
        my ($url) = @_;
        $url =~ s/$BACKEND_SERVER_URL//;
        return encode_json( $Mocks->{$url} );
    }
);

CharonFront::App->to_app;
