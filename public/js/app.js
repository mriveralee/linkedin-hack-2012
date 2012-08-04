/* BACKBONE - APP.JS FIle
 *
 *
 */

$(function() {
  // TODO: create chat send button
  // $('#chat-send-button').buttonset();

  //DMD user session
  TDM.User.currentUser = new TDM.User();
  $("#username-input-box").keyup(function() {
   TDM.User.currentUser.setUserName();
   });

  //make view

  // view.render ()
});



TDM.AppView = Backbone.View.extend({
  el: $('#tdm-app'),

  events: {

  },

//   users: {},
//   room: {},
//   currentVideo: {},
//   playlist: {},

   initialize: function() {

    //Create models

    var userModel = new TDM.User({ id: "userId123" });
    this.test = userModel;
    var roomModel = new TDM.Room({ id: "roomIdmew" });
    var playlistModel = new TDM.Playlist({ id: "playlistIdrawr" });
    var videoModel = new TDM.Video({ id: "videoIdFoo" });

//    debugger;

    if (APPDATA.USERS) {
     this.users = APPDATA.USERS;
    }

    if (APPDATA.CURRENT_USER) {
       this.currentUser = APPDATA.CURRENT_USER;
     }

   if (APPDATA.ROOM) {
     this.room = APPDATA.ROOM;
   }

   if (APPDATA.CURRENT_VIDEO) {
     this.currentVideo = APPDATA.CURRENT_VIDEO;
   }

   if (APPDATA.PLAYLIST) {
     this.playlist = APPDATA.PLAYLIST;
   }

   },

  render: function() {
   //Render AppView Then Render SubViews

   if (APPDATA === {}) {
     //CREATE-ROOM VIEW

   } //Do rendering based on APPDATA. <>

   if (this.room) {
    //Create room model

     //attach model to view & render RoomView


   }

   if (this.playlist) {
    // Make playlist model

    //Attach model, Make playlistView & render

   }

    if (this.currentVideo) {
      // Make video model

      // set render in VideoView
    }

   if (this.currentUser) {
     // Make currentUser model

     // set currentUser to TDM.User.CURRENT_USER
   }
  }

});


//Check for appdata
if (!APPDATA) {
  APPDATA = {};
}

var APP = new TDM.AppView;
// Add to namespace
TDM.APP = APP;