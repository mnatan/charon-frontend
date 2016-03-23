package CharonFront::RESTUser;
use strict;
use warnings;

use Exporter qw(import);
our @EXPORT_OK = qw(
json_post
json_get
);

use LWP::UserAgent;
use HTTP::Request;
use JSON;

my $user_agent = "Charon-Frontend";

sub json_post {
    my ( $url, $arguments ) = @_;

    my $ua = LWP::UserAgent->new;
    $ua->agent($user_agent);

    my $response = $ua->post( $url, $arguments, );

    if ( $response->content ) {
        return decode_json $response->content;
    }
    else {
        return {
            status  => $response->code,
            message => $response->message,
        };
    }
}

sub json_get {
    my ( $url, $arguments ) = @_;

    my $ua = LWP::UserAgent->new;
    $ua->agent($user_agent);

    # Pass a url sanitazier
    my @parameters;
    while ( my ( $key, $value ) = each %{$arguments} ) {
        push @parameters, "$key=$value";
    }
    my $parameters_for_url = join "&", @parameters;
    my $response = $ua->get( $url . "?$parameters_for_url" );

    if ( $response->content ) {
        return decode_json $response->content;
    }
    else {
        return {
            status  => $response->code,
            message => $response->message,
        };
    }
}

1;
