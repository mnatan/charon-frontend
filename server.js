/**
 * Created by Marcin Natanek on 03.09.2016.
 */

var express = require('express');
var morgan = require('morgan');
var proxy = require('express-http-proxy');

var SEGMENT = process.argv[2];

var config = require('./config.json')[SEGMENT];

var app = express();
app.use(morgan('dev'));

app.use(express.static(__dirname + '/front'));

app.use('/api', proxy(config.backend_url));

app.get('/', function (req, res) {
    res.redirect('/app');
});

app.listen(8000);

console.log("App listening on port 8000");

