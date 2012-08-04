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

   if (APPDATA.USER_PLAYLISTS) {
     this.playlist = APPDATA.USER_PLAYLISTS;
   }
   this.render();
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

   this.playlist = { id: "fillerPlaylistID" };

   if (this.playlist) {
    // Make playlist model
    var currentPlaylistModel = new TDM.Playlist({ id: this.playlist.id });
    currentPlaylistModel.fetch();
    var currentPlaylistView = new TDM.PlaylistView({ model: currentPlaylistModel });

    //Attach model, Make playlistView & render

   }

      this.currentVideo = { id: "foo" };


    if (this.currentVideo) {
      // Make video model

        var currentVideoModel = new TDM.Video({ id: this.currentVideo.id });
        currentVideoModel.fetch();
        var currentPlayerView = new TDM.PlayerView({ model: currentVideoModel });


      // set render in VideoView
    }


   if (this.currentUser) {
     // Make currentUser model

     // set currentUser to TDM.User.CURRENT_USER
   }
  }

});

 APPDATA;
//Check for appdata
if (!APPDATA) {
  APPDATA = {};
}

var APP = new TDM.AppView;
// Add to namespace
TDM.APP = APP;