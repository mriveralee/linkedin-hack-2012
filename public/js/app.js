/* BACKBONE - APP.JS FIle
 *
 *
 */

$(function() {
  $('#chat-send-button').buttonset();

  //DMD user session
  TDM.User.currentUser = new DMD.User();
  $("#username-input-box").keyup(function() {
   TDM.User.currentUser.setUserName();
   });

});
