
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , app = express()
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , passport = require('passport')
  , sqlite3 = require('sqlite3').verbose()
  , util = require('util');




CONST = {
  developer_key : 'AI39si4gv_2PveEdcwyyPnqk5QFK83gp5TpnxHFzOOGexfnsL03lcXU3IvyGZcU9H1BoTYpGUAiIIdn7DF7UGoDHZI5zGlL2fQ',
  client_id : '929100726806.apps.googleusercontent.com',
  client_secret : 'NLd7hSKALSGTG8VOFEoNquOz'
};

module.exports.server = app;
module.exports.CONST = CONST;
module.exports.token = '';


var dataRoutes = require('./routes/data');


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(passport.initialize());
  app.use(passport.session());
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


var routes = require('./routes')


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: CONST.client_id,
    clientSecret: CONST.client_secret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
     console.log(accessToken);
    token = accessToken;
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));




var appServer = http.createServer(app);

//var io = require('socket.io').listen(appServer);


appServer.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});




var io = require('socket.io').listen(appServer);
io.set("log level", 0);


io.sockets.on('connection', function (socket) {
//  db.all("SELECT * FROM messages", function(e, r) {
//    socket.emit("message history", {"history": r});
//    console.log(r);
//  });

  //socket.emit("test", {hello:'test'});
  //console.log("SENT TEST");

  socket.on('chat message', function (data) {
    data.create_date = Math.floor(new Date().getTime() / 1000);
    data.room = "blah";
    io.sockets.emit('chat message', data);
    //console.log(data);

    // record the chat message at some point
    // db.run("INSERT INTO messages (create_date, user, room, message) values (?, ?, ?, ?)", data.create_date, data.user, data.room, data.message);
  });
});








module.exports.appServer = appServer;
//module.exports.io = io;