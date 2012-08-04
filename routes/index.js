
/*
 * GET home page.
 */


var app = require('../app').server;



function index(req, res){
  console.log ('HIT');
  var data = {
    name: 'bob',
    id: 'something',
    test: 'shit'
  };

  res.render('index', { title: 'Express', data:data });
};


app.get('/', index);


module.exports.index = index;

