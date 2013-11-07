
/**
 * Module dependencies.
 */

var express = require('express')
    mongoose = require('mongoose'),
    routes = require('./routes'),
    index = require('./routes/index'),
    http = require('http'),
    path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/fetchSTopScore', index.fetchSTopScore);
app.post('/fetchSClosestScore',index.fetchSClosestScore);
app.post('/setScore', index.setScore);

var mongo = require('./models/Mongo');
mongo.initialize();
mongo.connect(function(err) {
    if (err) {
        throw err;
    }
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});
