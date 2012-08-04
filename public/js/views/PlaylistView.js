/**
  * PlaylistView.js
  * PlaylistView
  *
  * 
  * @module  TDM
  * @class PlaylistView
  */

TDM.PlaylistView = Backbone.View.extend({

    templateName: TDM.templates.playlist,

    initialize: function() {
        TDM.templateManager.getTemplate(this.templateName);
        var model = this.model;
        model.on('change', this.render, this);
        this.render();
    },

    render: function() {
        if (this.model) {
            var playlistName = this.model.getPlaylistName();
            var videos = this.model.getVideos();
            var templateHTML = _.template(TDM.templateManager.getTemplate(this.templateName), {
                playlistName: playlistName,
                videos: videos
            });
            $('#playlist-view-container').html(templateHTML);
        }
    }

});