/**
  * User.js
  * User Model
  *
  * 
  * @module  TDM
  * @class User
  */

TDM.VideoListView = Backbone.View.extend({

    templateName: TDM.templates.video_list_item,
    videosContainer: '#playlist-videos-container',

    initialize: function() {
        TDM.templateManager.getTemplate(this.templateName);
        var model = this.model;
        model.on('change', this.render, this);
        _.bindAll(this, 'render');
        this.render();
    },

    events: {
        "tap .video-list-item" : "updatePlayer"
    },

    render: function() {
        if (this.model) {
            var videoName = (this.model.getVideoName()) ? this.model.getVideoName() : "";
            var description = (this.model.getDescription()) ? this.model.getDescription() : "";
            var ownerID = (this.model.getOwnerID()) ? this.model.getOwnerID() : "";
            var videoURL = (this.model.getVideoURL()) ? this.model.getVideoURL() : "";
            var dateAdded = (this.model.getDateAdded()) ? this.model.getDateAdded() : "";
            var thumbnailURL = (this.model.getThumbnailURL()) ? this.model.getThumbnailURL() : "";

            var templateHTML = _.template(TDM.templateManager.getTemplate(this.templateName), {
                videoName: videoName,
                description: description,
                ownerID: ownerID,
                videoURL: videoURL,
                dateAdded: dateAdded,
                thumbnailURL: thumbnailURL
            });

            debugger;

            $(this.videosContainer).append(templateHTML);



        }
    },

    updatePlayer: function() {
       debugger;
        var newPlayerView = new TDM.PlayerView({ model: this.model });
    }

});