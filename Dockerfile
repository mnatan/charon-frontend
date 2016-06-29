FROM perl:latest
MAINTAINER Marcin Natanek <mnatan@openmailbox.org>

RUN cpanm -n Dancer2
RUN cpanm -n Dancer2
RUN cpanm -n Dancer2::Plugin::Deferred
RUN cpanm -n LWP::Simple::REST
RUN cpanm -n JSON::XS
RUN cpanm -n YAML::XS
RUN cpanm -n CSS::LESSp
RUN cpanm -n Dancer2::Session::Cookie
RUN cpanm -n Template

COPY . /app
WORKDIR /app

EXPOSE 5000

# CMD ["plackup", "-R", "./lib,./bin,./configs", "bin/app.psgi", "--port", "5000"]
