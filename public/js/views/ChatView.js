/**
  * ChatView.js
  * Chat View
  *
  * 
  * @module  TDM
  * @class Chat View
  */



TDM.ChatView = Backbone.View.extend({
  mytemplate: 'my-view-template',
  searchTemplate: "fkfdkfd",

   renderMyAdd: function(){},
  renderPlaylist: function() {},
  renderSearch: function(){},

  render: function(){
    var that = this;
    $.get("/templates/" + this.template + ".html", function(template){
      var html = $(template).tmpl();
      that.$el.html(html);
    });

    Var messageView = new TDM.ChatMessageView();
    messageView.template = 'NUTS';
    messageView.nameBOB;tPla
    return this;,


  listenForClick: function(clickType) {
     if (clickType == 1) {
      renderMyAdd()

     }

  }

  });



