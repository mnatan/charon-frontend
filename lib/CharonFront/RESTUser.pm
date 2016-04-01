package CharonFront::RESTUser;
use strict;
use warnings;

use LWP::UserAgent;
use HTTP::Request;
use JSON;

use Dancer2;

use Exporter qw(import);
our @EXPORT_OK = qw(
    backend_post
    backend_get
);

use Data::Dumper;

my $DEBUG = 1;

my $user_agent         = "Charon-Frontend";
my $BACKEND_SERVER_URL = setting("BACKEND_SERVER_URL");

sub backend_get {
    my ( $url, $arguments ) = @_;
    my $out;

    print "--------- GET -----------\n" if $DEBUG;

    my $ua = LWP::UserAgent->new;
    $ua->agent($user_agent);

    my @parameters;
    while ( my ( $key, $value ) = each %{$arguments} ) {
        push @parameters, "$key=$value";
    }
    my $parameters_for_url = join "&", @parameters;

    my $response
        = $ua->get( $BACKEND_SERVER_URL . $url . "?$parameters_for_url" );

    if ( $response->content ) {
        $out = decode_json $response->content;
    }
    else {
        $out = {
            status  => $response->code,
            message => $response->message,
        };
    }
    print Dumper $out if $DEBUG;
    print "--------  /GET  ----------\n" if $DEBUG;
    return $out;
}

sub backend_post {
    my ( $url, $arguments ) = @_;
    my $out;

    print "--------- POST -----------\n" if $DEBUG;
    print Dumper $arguments if $DEBUG;

    my $ua = LWP::UserAgent->new;
    $ua->agent($user_agent);

    my $response = $ua->post( $BACKEND_SERVER_URL . $url, $arguments );

    if ( $response->content ) {
        $out = decode_json $response->content;
    }
    else {
        $out = {
            status  => $response->code,
            message => $response->message,
        };
    }
    print Dumper $out if $DEBUG;
    print "--------  /POST  ----------\n" if $DEBUG;
    return $out;
}

1;
