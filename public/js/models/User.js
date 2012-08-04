/**
  * User.js
  * User Model
  *
  * 
  * @module  MDM
  * @class User
  */

TDM.User = Backbone.Model.extend({

  //url: function() { return this.buildUrl(DMD.config.authUrl); },
  urlRoot: "/user",


  /**
   * <p>Returns the user's full name. Use with caution: this has not been
   * internationalized.</p>
   *
   * @method fullName
   */
  getUserName: function() {
    return this.get('username');
  },

  getRooms: function() {
      return this.get('rooms');
  },

  getCreatedDate: function() {
      return this.get('createdDate');
  },

//  getIconURL: function() {
//      return this.get('iconURL');
//  },

  getEmail: function() {
      return this.get('email');
  },

//  getYoutubeName: function() {
//      return this.get('youtubeName');
//  },

  setUserName: function(){
    var value = $('#username-input-box').val();
    if(value && value != ""){
      this.set({'username': value});
    }
  },
 

  fetchSettings: function(){
    /*   var settings = new TLI.UserSettings();

    settings.fetch({
      success:_.bind(function( model,response ){
        var user =this.updateTwitterHandle(response.twitter);
      },this)
    });
  */
  }


},{

  // static attributes and methods
  CURRENT_USER_KEY: "TMD:currentUser",
  currentUser: null,

  /**
   * <p>Logs out the current user.</p>
   *
   * @method logout
   */
  logout: function() {
	// Erase cookies
  },

  /**
   * <p>Tests for login status.</p>
   *
   * @method isLoggedIn
   */
  isLoggedIn: function() {
  }
});



