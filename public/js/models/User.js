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

  /**
   * <p>Returns the user's full name. Use with caution: this has not been
   * internationalized.</p>
   *
   * @method fullName
   */
  userName: function() {
    return this.get('username');
  },

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
  CURRENT_USER_KEY: "DMD:currentUser",
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



