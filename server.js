/**
 * Created by Marcin Natanek on 03.09.2016.
 */

var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));

app.use(express.static(__dirname + '/front'));

app.get('/', function (req, res) {
    res.redirect('/app');
});

app.listen(8000);

console.log("App listening on port 8000");

