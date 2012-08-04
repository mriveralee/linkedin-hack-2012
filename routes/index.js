
/*
 * GET home page.
 */


var app = require('../app').server

console.log(app + 'hi');

function index(req, res){
  console.log ('HIT');
  res.render('index', { title: 'Express' });
};



app.get('/', index);



module.exports.index = index;
