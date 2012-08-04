/**
  * ChatView.js
  * Chat View
  *
  * 
  * @module  TDM
  * @class Chat View
  */



TDM.ChatView = Backbone.View.extend({

  render: function(){
    var that = this;
    $.get("/templates/" + this.template + ".html", function(template){
      var html = $(template).tmpl();
      that.$el.html(html);
    });
  }



  });



