
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var app = express();
var util = require('util');
/***************************LEAVE IN THIS ORDER *****************************/
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/linkedin.db');

console.log('DB:' + JSON.stringify(db));
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');
module.exports.server = app;


/****************************************************************************/

CONST = {
  developer_key : 'AI39si4gv_2PveEdcwyyPnqk5QFK83gp5TpnxHFzOOGexfnsL03lcXU3IvyGZcU9H1BoTYpGUAiIIdn7DF7UGoDHZI5zGlL2fQ',
  client_id : '929100726806.apps.googleusercontent.com',
  client_secret : 'NLd7hSKALSGTG8VOFEoNquOz'
};

module.exports.server = app;
module.exports.CONST = CONST;
module.exports.token = '';



//console.log("database" + db);



function createDB(){
    db.serialize(function() {

        db.run("DROP TABLE IF EXISTS messages");
        db.run("DROP TABLE IF EXISTS users");
        db.run("DROP TABLE IF EXISTS rooms");
        db.run("DROP TABLE IF EXISTS videos");
        db.run("DROP TABLE IF EXISTS playlists");

        //store rooms in csv or json
        db.run("CREATE TABLE users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, \
                               name TEXT, \
                               rooms TEXT, \
                               created_date INTEGER, \
                               email TEXT, \
                               UNIQUE (email))");

        //store users, messages in csv or json
        db.run("CREATE TABLE rooms(room_id INTEGER PRIMARY KEY, \
                              roomName TEXT, \
                              users TEXT, \
                              messages TEXT, \
                              playlists TEXT)");

        db.run("CREATE TABLE videos(video_id INTEGER PRIMARY KEY, \
                              videoName TEXT, \
                              description TEXT, \
                              owner_id INTEGER \
                              )");
        //store videos in csv or json
        db.run("CREATE TABLE playlists(playlist_id INTEGER PRIMARY KEY, \
                                   playlistName TEXT, \
                                   videos TEXT)")
        // chat messages table
        db.run("CREATE TABLE messages(message_id INTEGER PRIMARY KEY, \
                                   create_date INTEGER, \
                                   user TEXT, \
                                   room TEXT, \
                                   message TEXT)");

    });
}



app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(passport.initialize());
  app.use(passport.session());
    app.use(app.router);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('heyGirlHay'));
  app.use(express.session({ secret:'supGURLHowYouDoin' }));
  app.use(express.static(__dirname + '/public'));
  //var DATABASE = db;
  createDB();
  //  console.log('DB:' + JSON.stringify(db));
});


var dataRoutes = require('./routes/data');

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
    profile = profile._json;
    console.log(accessToken);

    console.log('THIS IS PROFILE');
    console.log(profile);
    //store the user
    
    token = accessToken;

    create_date = Math.floor(new Date().getTime() / 1000);
     
    db.run("INSERT OR IGNORE INTO users (user_id, name, rooms, created_date, email) values (?, ?, ?, ?, ?)", null, profile.name, '', create_date, profile.email);
         

//    db.run("INSERT INTO users (user_id, name, rooms, created_date, email) values (?, ?, ?, ?, ?)", create_date, , data.room, data.message);




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




http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var indexRoutes = require('./routes/index');