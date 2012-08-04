
/*
 * GET home page.
 */


var app = require('../app').server
  , passport = require('passport');

console.log(app + 'hi');

function index(req, res){
  console.log ('HIT');
  res.render('index', { title: 'Express' });
};



app.get('/', index);

app.get('/auth/google'
        , passport.authenticate('google'
            , { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                        'https://www.googleapis.com/auth/userinfo.email',  
                        'http://gdata.youtube.com'] })
        , function(req, res){
          // The request will be redirected to Google for authentication, so
          // this function will not be called.
          });

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports.index = index;
