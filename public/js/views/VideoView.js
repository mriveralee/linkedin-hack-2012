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

        TDM.templateManager.getTemplate(templateName);

    }

});