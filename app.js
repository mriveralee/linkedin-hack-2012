
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , app = express()
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , passport = require('passport')
  , sqlite3 = require('sqlite3').verbose(); 

module.exports.server = app;
var routes = require('./routes')

var CONST = {
  developer_key : 'AI39si690AnNpY9TYbvfQct76XGymYa1humiQXoVc7BCM4XrmWp_P4yqGr3dpzbhdhoYpTg',
  client_id : '929100726806.apps.googleusercontent.com',
  client_secret : 'NLd7hSKALSGTG8VOFEoNquOz'
}

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('heyGirlHay'));
  app.use(express.session({ secret:'supGURLHowYouDoin' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


//passport oauth
passport.use(new GoogleStrategy({
    clientID: CONST.client_id,
    clientSecret: CONST.client_secret,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log('in the passport!');
      console.log(accessToken);
      console.log(refreshToken);
      return done(err, user);
    });
  }
));

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});




