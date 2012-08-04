
/*
 * GET home page.
 */


var app = require('../app').server
  , passport = require('passport')
  , http = require('http');

console.log(app + 'hi');

function index(req, res){
  console.log ('HIT');
  var data = {
    name: 'bob',
    id: 'something',
    test: 'shit'
  };

  res.render('index', { title: 'Express', data:data });
};

function login(req, res){
  console.log ('HIT');
  res.render('login', { title: 'Express' });
};



function playlist(req, res){
  var url = '/feeds/api/users/default/playlists?v=2&alt=json' + 
    '&key=' + CONST.developer_key;

  var options = {
    host: 'gdata.youtube.com',
    port: 80,
    path: url,
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token,
    }
  };

  var req = http.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    var body = '';
    res.setEncoding('utf8');
    //data comes in chunks
    res.on('data', function(data) {
      body += data
      console.log('chunked')
    });
    
    res.on('end', function(){
       var data = JSON.parse(body).feed.entry;
       console.log(data);
    });
  });

  req.on('error', function(e) {

    console.log('\n NOOOO THERE WAS AN ERROR MAKING THE PLAYLIST REQUEST!!!!!\n')
    console.error(e);
  });
  
  req.end();




}


app.get('/', index);
app.get('/login', login);
app.get('/playlists', playlist);
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
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/playlists');
  });






module.exports.index = index;
