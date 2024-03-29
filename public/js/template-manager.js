/* TDM - Template Manager
 * File containing refs to HTML templates
 *
 */

// App Name Space x.x
TDM = {};

/* To get a template ask TDM.templateManager.getTemplate(<name>)
 * with the <name> of the the template
 */


TDM.templates = {
	// Names of templates
  'chat_message_item': 'chat-message-item.html',
  'video': 'video.html',
  'player': 'player.html',
  'playlist': 'playlist.html',
  'videolist': 'videolist.html',
   'video_list_item': 'video-list-item.html'

	//Add more
	//'name': 'file.html'
};


// Template Manager - DO NOT EDIT
TDM.templateManager = {
  'directory': '/templates/',
  'savedTemplates': {},

  'getURLFor': function(template) {
    return this.directory+template;
   },


  'getTemplate': function(templateName, callback) {
	//Given a TDM template name get url and return it if it is saved otherwise do an jax 
		if (TDM.templateManager.savedTemplates[templateName]) {
		 	if(callback) {
       return callback(TDM.templateManager.savedTemplates[templateName]);
       }

      return TDM.templateManager.savedTemplates[templateName];

		}
		else {
      var callbackBlock = callback;
			var savedName = templateName;
      $.get(TDM.templateManager.getURLFor(templateName), function(htmlTemplate){
		    	TDM.templateManager.savedTemplates[savedName] = htmlTemplate;
		  if (callbackBlock) {
        return callbackBlock(htmlTemplate);
      }
      });
		}
	},

  'preloadTemplates' : function(){
    for (key in TDM.templates) {
      TDM.templateManager.getTemplate(TDM.templates[key]);
      //console.log('Template Loaded: ' + TDM.templates[key]);
    }
    console.log('Templates Preloaded');
  }
};


// Place Kitten Image URLS for mockups
TDM.placeKitten = {
  'getURLWithSize': function(width,height){
    return 'http://www.placekitten.com/'+width+'/'+height;
  }
};

TDM.templateManager.preloadTemplates();
