/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , user = require('./routes/user')
  , home = require('./routes/home')
  , meetingSchedule = require('./routes/meetingSchedule')
  , projectGallery = require('./routes/projectGallery')
  , contact = require('./routes/contact')
  , mongoose = require('mongoose')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function () {
  app.set('host', 'localhost:3000');
  app.use(express.errorHandler());
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
});

app.configure('production', function () {
  // app.set('host', 'quotes.olinapps.com');
});

app.get('/', home.splash);
app.get('/about', home.splash);
app.get('/meetingSchedule', meetingSchedule.display);
app.get('/projectGallery', projectGallery.index);
app.get('/contact', contact.display);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
