var app = require('../app').server
    , passport = require('passport')
    , http = require('http');


function joinRoom(req, res){
  var roomID = req.param('id');
  //Room Data from DB and other crap by using room ID
   var data = {};
  // render template with room data
  res.render('room', { title: 'Room' + roomID, data:data });
};



module.exports.joinRoom = joinRoom;

app.get('/join/room/:id', joinRoom);