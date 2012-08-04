/* BACKBONE - APP.JS FIle
 *
 *
 */

$(function() {
  // TODO: create chat send button
  // $('#chat-send-button').buttonset();

  //DMD user session
  TDM.User.currentUser = new TDM.User();
  $("#username-input-box").keyup(function() {
   TDM.User.currentUser.setUserName();
   });

  //make view

  // view.render ()
});
