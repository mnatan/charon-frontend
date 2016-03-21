package CharonFront::LESS;
use strict;
use warnings;

use Exporter qw(import);
our @EXPORT_OK = qw(generate_css);

use CSS::LESSp;
use File::Basename;

# generate css files from less
sub generate_css {
    my ($appdir) = @_;

    my @less_files = <$appdir/public/less/*.less>;

    foreach my $file (@less_files) {
        my $name = basename($file);
        print "generating css for: $name\n";

        my $buffer;

        open( my $in, "<", "$appdir/public/less/$name" )
            or die("cant read less file!");
        for (<$in>) { $buffer .= $_ }
        close($in);
        my @css = CSS::LESSp->parse($buffer);

        my $css = $name =~ s/\.less/\.css/r;
        open( my $out, ">", "$appdir/public/css/$css" )
            or die("cant open css outfile!");
        for (@css) { print $out $_ }
        close($out);
    }
}

1;
