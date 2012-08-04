/**
  * PlayerView.js
  * PlayView
  *
  * 
  * @module TDM
  * @class PlayerView
  */

TDM.PlayerView = Backbone.View.extend({

    templateName: TDM.templates.player,

    initialize: function() {
        TDM.templateManager.getTemplate(this.templateName);
        var model = this.model;
        model.on('change', this.render, this);
        this.render();
    },

    render: function() {
        if (this.model) {
            var videoName = (this.model.getVideoName()) ? this.model.getVideoName() : "" ;
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
            $('#player-view-container').html(templateHTML);
        }
    }

});