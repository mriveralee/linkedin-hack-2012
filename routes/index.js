
/*
 * GET home page.
 */

var appFile = require('../app');
var app = appFile.server
  , passport = require('passport')
  , http = require('http');

var test = appFile.test;
 console.log(test);
//console.log(app + 'hi');

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
        'Authorization': 'Bearer ' + token
    }
  };

  function resultOnEnd(body){
    var tempJson = JSON.parse(body).feed.entry;
    var data = {};
    for(i in tempJson){

      var patt = /playlist:[a-z A-Z 0-9]*/;
      var tempstring = patt.exec(tempJson[i].id.$t).toString();
      tempstring = tempstring.replace('playlist:', '');
      data[tempJson[index].title.$t] = tempstring;
    }
    res.json(data);
  }
  //initial request
  makeRequest(options, resultOnEnd);
}

function getPlaylistData(req, res){
  var playlistID = req.param('id');
  console.log("Playlist ID" + playlistID);
  var url = 'http://gdata.youtube.com/feeds/api/playlists/' + playlistID + '?v=2&alt=json';

  var options = {
    host: 'gdata.youtube.com',
    port: 80,
    path: url,
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    }
  };

  var resultOnEnd = function(body){
    console.log('in here yo');
    var tempJson = JSON.parse(body).feed;
    returnVal = {};
    returnVal.playlistName = tempJson.title.$t
    var videos = [];

    tempJson = tempJson.entry;
    for(i in tempJson){
      var item = tempJson[i];
      var mediaGroup = item.media$group;
      var temp = {};
      temp['title'] = mediaGroup.media$title.$t;
      temp['videoURL'] = item.content.src;
      temp['description'] = mediaGroup.media$description.$t;
      temp['thumbnailURL'] = mediaGroup.media$thumbnail[0].url;
      videos.push(temp);
    }
    returnVal.videos = videos;
    console.log(videos);
    console.log(returnVal)
    res.json(returnVal);
  }
  console.log('hiii');
  makeRequest(options, resultOnEnd);
}

//resultOnEnd(body) - body is the json returned

function makeRequest(options, resultOnEnd){
  var returnVal;
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
      resultOnEnd(body);
//      console.log(returnVal);
      console.log('finishes');
    });

  });

  req.on('error', function(e) {
    console.log('\n NOOOO THERE WAS AN ERROR MAKING THE REQUEST!!!!!\n')
    console.error(e);

  });


  req.end();
 }






app.get('/', index);
app.get('/login', login);
app.get('/playlists', playlist);
app.get('/playlist/:id', getPlaylistData);
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







//module.exports.index = index;
// module.exports.createDB = createDB();