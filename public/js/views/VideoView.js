/**
  * VideoView.js
  * VideoView
  *
  * 
  * @module  TDM
  * @class VideoView
  */


TDM.VideoView = Backbone.View.extend({

    templateName: TDM.templates.video,

    initialize: function() {
        TDM.templateManager.getTemplate(this.templateName);
        var model = this.model;
        model.on('change', this.render, this);
        this.render();
    },

    render: function() {
        if (this.model) {
            var videoName = this.model.getVideoName();
            var description = this.model.getDescription();
            var ownerID = this.model.getOwnerID();
            var templateHTML = _.template(TDM.templateManager.getTemplate(this.templateName), {
                videoName: videoName,
                description: description,
                ownerID: ownerID
            });
            $('#player-video-view').html(templateHTML);
        }
    }

});