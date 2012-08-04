
$(document).ready(function() {



  //console.log(document.location.href);

  var socket = io.connect(document.location.href);

  var chatWindow = $('#chat-messages-window');
  var chatMessageBox = $('#chat-text-input-box');
  var chatTemplate = TDM.templates.chat_message_item;

  TDM.templateManager.getTemplate(chatTemplate);

  // Receive chat message
  socket.on('chat message', function (data) {
    console.log(data);

    drawChat(data);
  });

  socket.on('test', function (data) {
    console.log(data);

  });

  // Chat history
  socket.on('message history', function (data) {
     console.log(data);
     drawHistory(data);

    });

  var LAST_CHAT = {
    user: "",
    dataIdentity: ""
  };



 //TODO draw history is incorrect
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
    var inputDiv = $('#chat-text-input-box');
    console.log(inputDiv);
    var chatMessage =  $(inputDiv).val();
    chatMessage = chatMessage.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

    // create some sort of data object
    if(chatMessage != ""){
      var kittyName = "User" + Math.round(Math.random()*3049539);

      var userName = (TDM.User.currentUser && TDM.User.currentUser.getUserName()) ? TDM.User.currentUser.getUserName() : "";
       if (!userName || userName === "") {
         TDM.User.currentUser.set('username', kittyName);
       }


      var data = {
        "user": (TDM.User.currentUser && TDM.User.currentUser.getUserName()) ? TDM.User.currentUser.getUserName() : "",
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
    //DATA IDENTITY
    var dataIdentity = getDataIdentityForMessage(msgData);

    if (LAST_CHAT.user !== msgData.user) {
      LAST_CHAT.dataIdentity = dataIdentity;
      LAST_CHAT.user = msgData.user;
      var html = _.template(TDM.templateManager.getTemplate(TDM.templates.chat_message_item),{msgData: msgData, image:image, dataIdentity:dataIdentity});
      chatWindow.append(html);
    }
    else {
     debugger;
      //Append Msg data
      var textLocation = getMSGTextLocation(LAST_CHAT.dataIdentity);
      var html = "\n\n"+ '<br>' +msgData.message;
      $(textLocation).append(html);

      //Update Time String
      var timeLocation = getMSGDateLocation(LAST_CHAT.dataIdentity);
      $(timeLocation).text(msgData.dateString);

    }

    // Disable if we only want scroll bottom on history load
    scrollChat();
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


  function getDataIdentityForMessage(msgData) {
    var dataIdentity = 'chat-msg-' + msgData.user+'-' + msgData['create_date'];
    return dataIdentity;
  }

  function getMSGTextLocation(dataIdentityData) {
    //var dataIdentity = getDataIdentityForMessage(dataIdentityData);
    var location =  'div[data-chat-msg-item='+ dataIdentityData +']';
    return location;
  }

  function getMSGDateLocation(dataIdentityData) {
    //var dataIdentity = getDataIdentityForMessage(dataIdentityData);
    var location =  'div[data-chat-msg-time='+ dataIdentityData + '-time' +']';
    return location;
  }



});

