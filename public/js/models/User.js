/**
  * User.js
  * User Model
  *
  * 
  * @module  MDM
  * @class User
  */

DMD.User = Backbone.Model.extend({

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
  /**
   * <p>Determines whether the user is authenticated.</p>
   *
   * @method isAuthenticated
   */
  isAuthenticated: function() {
   // return !!(this.get('authToken'));
  },

  /**
   * <p>Validate user object as an auth candidate.</p>
   *
   * @method validateForAuthentication
   */
  validateForAuthentication: function() {
   /* var username = this.get('username');
    var password = this.get('password');

    if (!(username &&
        username.length > 0 &&
        password &&
        password.length > 0)) {

      // TODO use localized string
      return "Username and password are required.";
    }

    return null;
    */
  },

  /**
   * <p>Authenticates the user againt the mobile server. Makes a choice based
   *    on env to do direct or secure proxy method.</p>
   *
   * @method authenticate
   */
  authenticate: function(opts) {
    this.directAuthenticate(opts);
  },

  /**
   * <p>Authenticates the user againt the mobile server, according to current
   * username and password.</p>
   *
   * @method directAuthenticate
   */
  directAuthenticate: function(opts) {
  /*  var self = this;

    if (typeof(opts) == 'undefined' || opts === null) {
      opts = {};
    }

    var successCallback = opts.success;
    var errorCallback = opts.error;

    // do validation
    var validationError = self.validateForAuthentication();
    if (validationError) {
      if (errorCallback) {
        // timeout for async
        setTimeout(function() {
          errorCallback.call(self, validationError);
        }, 0);
      }

      return;
    }

    var url = (typeof(self.url) === 'function' ? self.url() : self.url);

    if (self.get('recaptcha_challenge_field')) {
      url = self.buildUrl('/loginWithCaptcha');
    }

    $.ajax({ url: url,
      type: 'POST',
      cache: false,
      data: {
        username: self.get('username'),
        password: self.get('password')
      },
      dataType: 'json',
      success: function(data, txt, xhr) {
        // if the response is right, go ahead and call it a success.
        if (data.authToken) {

          self.set({password: null});
          self.set(data);

          if (successCallback) {
            successCallback.call(self, self, data);
          }
        } else {
          if (errorCallback) {
            errorCallback.call(self, $t('login-fail'), data);
          }
        }
      },
      error: function(xhr, txt, data) {
        if (errorCallback) {
          errorCallback.call(self, $t('login-fail'), data);
        }
      }
    });
    */
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

    //Erase cookies
 /*
    $h.deleteCookie('lim_auth');
    $h.deleteCookie('liuser');
    $h.deleteCookie('deepLinkHandled');
    $h.deleteCookie('customUrlLaunched');
    $h.deleteCookie('leo_auth_token');
    $h.deleteCookie('s_leo_auth_token');
    TLI.User.setCurrentUser(null);
  */
  },

  /**
   * <p>Tests for login status.</p>
   *
   * @method isLoggedIn
   */
  isLoggedIn: function() {

   /*
    if($config.enableSSO) {
      return true;
    } else {
      return !!TLI.User.getCurrentUser() &&
          (!document.cookie ||
              (document.cookie.indexOf('lim_auth') > -1) ||
              $config.useFixtures ||
              $config.env === 'test');
    }
    */
  }
});



