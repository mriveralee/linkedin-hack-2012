
$(document).ready(function() {

//  //Get template
//  $.get(TDM.templateManager.getURLFor(TDM.templateManager.chat_message_item), function(htmlTemplate){
//    TDM.templateManager.savedTemplates.chat_message_item = htmlTemplate;
//  });


  var socket = io.connect("http://localhost:3000");
  var chatWindow = $('#chat-messages-window');
  var chatMessageBox = $('#chat-text-input-box');
  var chatTemplate = TDM.templateManager.chat_message_item;

  // Receive chat message
  socket.on('chat message', function (data) {
    console.log(data);

    drawChat(data);
  });

  // Chat history
  socket.on('message history', function (data) {
     console.log(data);
     drawHistory(data);

    });


  var drawHistory = function(data) {
    var history = data.history;
    if (history) {

      var randNum = Math.round((Math.random()*100))%10;

      var imgDim = 35;
      var randImage = imgDim+randNum;

      //Image Var
      var image = {}
      image.dimension = imgDim;
      image.url = TDM.placeKitten.getURLWithSize(randImage,randImage);


      var sortedHistory =  _.sortBy(data.history, 'create_date');

      _.each(sortedHistory, function(key, value){
        var msgData = key;

        var date = new Date(key['create_date']*1000);
        var dateStr = date.getMonth() +"/" + date.getDate() + "/" + date.getFullYear();
        msgData.dateString = date.toLocaleTimeString() + " " + dateStr;
        if (!TDM.templateManager.savedTemplates.chat_message_item){
          var templateURL = TDM.templateManager.getURLFor(TDM.templateManager.chat_message_item);
          $.get(templateURL, function(htmlTemplate){
            TDM.templateManager.savedTemplates.chat_message_item = htmlTemplate;
            var html = _.template(htmlTemplate,{msgData: msgData, image:image});
            chatWindow.append(html);
          });
        } else {
          //Image Var
          var html = _.template(TDM.templateManager.savedTemplates.chat_message_item,{msgData: msgData, image:image});
          chatWindow.append(html);

        }

      });
      scrollChat();
    }
  };


  // Send chat message
  var sendChat = function() {

    var chatMessage = $('#chat-text-input-box').val();
    // create some sort of data object
    if(chatMessage != ""){
      var data = {
        "user": (TDM.User.currentUser) ? TDM.User.currentUser.userName() : "Unnamed User",
        "message": chatMessage
      };

      $('#chat-text-input-box').val("");

      // Draw more stuff onto the chat window
      //drawChat(data);

      socket.emit('chat message', data);
    }
  };


  // change this, make this draw something smarter
  var drawChat = function(data) {
    var templateURL = TDM.templateManager.getURLFor(chatTemplate);
    var msgData = data;
    var randNum = Math.round((Math.random()*100))%10;

    var imgDim = 35;
    var randImage = imgDim+randNum;

    //Image Var
    var image = {}
    image.dimension = imgDim;
    image.url = TDM.placeKitten.getURLWithSize(randImage,randImage);

    var date = new Date(data['create_date']*1000);
    var dateStr = date.getMonth() +"/" + date.getDate() + "/" + date.getFullYear();
    msgData.dateString = date.toLocaleTimeString() + " " + dateStr;

    if (!TDM.templateManager.savedTemplates.chat_message_item){
      $.get(templateURL, function(htmlTemplate){
        TDM.templateManager.savedTemplates.chat_message_item = htmlTemplate;
        var html = _.template(htmlTemplate,{msgData: msgData, image:image});
        chatWindow.append(html);
      });
    } else {
      //Image Var
      var html = _.template(TDM.templateManager.savedTemplates.chat_message_item,{msgData: msgData, image:image});
      chatWindow.append(html);


    }
    // Disable if we only want scroll bottom on history load
    //scrollChat();
  };

  var scrollChat = function(){
      chatWindow[0].scrollTop = chatWindow[0].scrollHeight;

  };

  // button click
  $('#chat-send-button').click(function() {
    sendChat();
  });

  // press enter in text area
  chatMessageBox.keypress(function(e) {
    if (e.keyCode == 13) {
      sendChat();
      return false;
    }

  });
});

