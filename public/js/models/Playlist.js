/**
  * Playlist.js
  * Playlist Model
  *
  * 
  * @module  MDM
  * @class Playlist
  */


TDM.Playlist = Backbone.Model.extend({

    urlRoot: '/playlist',

    getPlaylistName: function() {
        return this.get('playlistName');
    },

    getVideos: function() {
        return this.get('videos');
    }

});