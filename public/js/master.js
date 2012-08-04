//this function includes all necessary js files for the application
function include(file)
{

  var script  = document.createElement('script');
  script.src  = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);

}


//App Namespace
TDM = {};






/* include any js files here */
//include('/js/underscore-min.js');
//include('js/jquery-1.7.2.min.js');
//include('/js/jquery-ui-1.8.21.custom/jquery-ui-1.8.21.custom.min.js');
//include('/js/backbone-min.js');
//include('/js/json2.js');
//include('/js/socket.io.js');

include('/js/chatApp.js');

//Backbone Models
include('/js/models/Chat.js');
include('/js/models/User.js');
include('/js/models/Video.js');
include('/js/models/Room.js');
include('/js/models/Playlist.js');

//Backbone Views
include('/js/views/CreateRoomView.js');
include('/js/views/ChatMessageView.js');
include('/js/views/ChatView.js');
include('/js/views/VideoView.js');
include('/js/views/VideolistView.js');
include('/js/views/PlayerView.js');
include('/js/views/PlaylistView.js');
include('/js/views/LoginView.js');


//Backbone App
include('/js/app.js');
