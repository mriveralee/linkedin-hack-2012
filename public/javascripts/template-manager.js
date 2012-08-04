/* TDM - Template Manager
 * File containing refs to HTML templates
 *
 */



/* To get a template ask TDM.templateManager.getTemplate(<name>)
 * with the <name> of the the template
 */


TDM.templates = {
	// Names of templates
    'chat_message_item': 'chat-message-item.html'
	
	//Add more
	'name': 'file.html'	
};


// Template Manager - DO NOT EDIT
TDM.templateManager = {
  'directory': '/templates/',

  //App template names
  'chatMessageItem': 'chat-message-item.html',  	// was chat_message_item for name


  'getURLFor': function(template) {
    return this.directory+template;
   },
  'getTemplate': function(templateName) {
	//Given a TDM template name get url and return it if it is saved otherwise do an jax 
		if (TDM.templates[templateName]) {
		 	return TDM.templates[templateName];
		}
		else {
			var savedName = templateName;
			$.get(TDM.templateManager.getURLFor(templateName), function(htmlTemplate){
		    	TDM.template[savedName] = htmlTemplate;
		  	});
		}
	}
};


// Place Kitten Image URLS for mockups
TDM.placeKitten = {
  'getURLWithSize': function(width,height){
    return 'http://www.placekitten.com/'+width+'/'+height;
  }
};

