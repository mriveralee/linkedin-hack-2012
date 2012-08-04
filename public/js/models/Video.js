/**
  * Video.js
  * Video Model
  *
  * 
  * @module  MDM
  * @class Video
  */

TDM.Video = Backbone.Model.extend({  
    urlRoot: '/video',

    getVideoName: function() {
        return this.get('videoName');
    },

    getDescription: function() {
        return this.get('description');
    },

    getOwnerID: function() {
        return this.get('ownerID');
    },

    getVideoURL: function() {
        return this.get('videoURL');
    },

    getDateAdded: function() {
        return this.get('dateAdded');
    }

});