var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var sk = require('./routes/sklaunch');

var app = express();


app.use('/', express.static(__dirname + '/client'));


app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/sklearn/:id', sk.skLaunch);

var server = app.listen(3000, function(){
    console.log('Listening on port 3000');
});

module.exports = app;
