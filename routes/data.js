
var app = require('../app').server;
var  http = require('http');



function getUserData(req, res){
  var userID = req.param('id');
  console.log("User ID" + userID);
  console.log ('USER DATA');
  var data = {
    userName: 'bob',
    createdDate: 'CreatedData',
    rooms: ['room1', 'room2', 'room3'],
    iconURL: "http://placekitten.com/40/40",  // Make sure this is encodedURI value
    email: "user@gmail.com",
    youtubeName: 'Youtuber1'
  };
  //Send Data
  res.json(data);
};



/*
function getRoomData(req, res){
  var roomID = req.param('id');
  console.log("Playlist ID" + roomID);
  console.log ('ROOM DATA');
  var data = {
    roomName: 'MY CRAZY ASS ROOM, Yo',
    chatID: 'chat2023023023',
    playlist: 'PlaylistID233435',
    currentVideo: 'MostRecent Video'
  };

  res.json(data);
};
*/


function pk(w,h) {
    return 'http://www.placekitten.com/' + w + '/' + h;
}


function getPlaylistData(req, res){
  var playlistID = req.param('id');
  console.log("Playlist ID" + playlistID);
  console.log ('PLAYLIST DATA');
  var data = {
    playlistName: 'My Playlist is effin Awwwwwwwh(yeah!)Some',
    videos: [{videoName: 'video1', thumbnailURL: pk(75,75), videoURL: "http://www.youtube.com/embed/up7L4UcVCOk" },
        {videoName: 'video2', thumbnailURL: pk(75,75), videoURL: "http://www.youtube.com/embed/IaZMST-vHfM"},
        {videoName: 'video3',  thumbnailURL: pk(75,75), videoURL: "http://www.youtube.com/embed/qr_L38bwZhU"}]
  };

  res.json(data);
};



function getVideoData(req, res){
  var videoID = req.param('id');
  console.log("Video ID" + videoID);
  var data = {
    videoName: 'bob',
    //description: 'THIS IS THE BEST EFFIN VIDEO EVAAAAAAA, YEAH GURRRL',
    ownerID: 'BOB the BuildAA',
    videoURL: 'http://www.youtube.com/embed/WRmBChQjZPs',
    dateAdded: 'Today'
  };

 res.json(data);
};



//app.get('/room/:id', getRoomData);
app.get('/playlist/:id', getPlaylistData);
app.get('/user/:id', getUserData);
app.get('/video/:id', getVideoData);



//module.exports.room = getRoomData;
module.exports.user = getUserData;
module.exports.playlist = getPlaylistData;
module.exports.video = getVideoData;


