// require express
var express = require('express');
var app = express();

// require express-handlebars
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// require body-parser for POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());


// require request
//var request = require('request');

// use specific folders for files
app.use('/static', express.static('public'));
app.use('/', express.static('public'));

// require mySQL
var mysql = require('./dbcon2.js');
app.set('mysql', mysql);

// set port from argument
app.set('port', process.argv[2]);

// GET index page
app.get('/',function(req,res){

  var context = {};
  res.render('index', context);

});

// GET account page
app.get('/account', function (req, res) {

	var context = {};
	res.render('account', context);

});

// USE categories page
app.use('/categories', require('./categories.js'));


// GET orders page
app.get('/orders', function (req, res) {

	var context = {};
	res.render('orders', context);

});

// GET orders_product page
app.get('/orders_product', function (req, res) {

	var context = {};
	res.render('orders_product', context);

});

// GET payment page
app.get('/payment', function (req, res) {

	var context = {};
	res.render('payment', context);

});

// GET product page
app.get('/product', function (req, res) {

	var context = {};
	res.render('product', context);

});

//exceptions handling
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500);
  res.render('500');
})

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
