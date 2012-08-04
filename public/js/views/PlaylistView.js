/**
  * PlaylistView.js
  * PlaylistView
  *
  * 
  * @module  TDM
  * @class PlaylistView
  */

var PLAYER = {};

TDM.PlaylistView = Backbone.View.extend({

    el: $('#playlist-videos-container'),


    templateName: TDM.templates.playlist,

    videosContainer: '#playlist-videos-container',

    initialize: function() {

        PLAYER = this;
        TDM.templateManager.getTemplate(this.templateName);
        var model = this.model;
        model.on('change', this.render, this);
        this.render();
    },

    events: {
        "click " : "log",
        "click .video-list-item" : "log"

    },

    log: function() {
        console.log("clicked playlist");
    },

    render: function() {
        if (this.model) {
            var playlistName = (this.model.getPlaylistName()) ? this.model.getPlaylistName() : "";
            var videos = (this.model.getVideos()) ? this.model.getVideos() : "";

          TDM.templateManager.getTemplate(this.templateName,  function (htmlTemplate) {
            var templateHTML = _.template(htmlTemplate, {
              playlistName: playlistName,
              videos: videos
            });
            $('#playlist-view-container').html(templateHTML);
          });

        _.each(videos, function(vid, key) {
          var videoData = {
              videoName : vid.videoName,
              description: vid.description,
              ownerID : vid.ownerID,
              videoURL : vid.videoURL,
              dateAdded : vid.dateAdded,
              thumbnailURL : vid.thumbnailURL
           };
          var vidModel = new TDM.Video(videoData);
          var vidView = new TDM.VideoListView({model:vidModel});
          var vidContainer = this.videosContainer;
//         TDM.templateManager.getTemplate(TDM.templates.video_list_item, function(htmlTemplate){
//           var templateHTML = _.template(htmlTemplate, videoData);
//           $(vidContainer).append(templateHTML);
//         });
            vidView.render();



        });
    }

}});