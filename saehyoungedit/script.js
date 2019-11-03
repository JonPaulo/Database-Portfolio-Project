var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require('request');
var mysql = require('mysql');

// var params = [];

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_bautijon',
  password        : '3212',
  database        : 'cs340_bautijon'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({secret:'superSecretPassword', resave: true, saveUninitialized: true}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);


app.get('/',function(req,res){

  var context = {};
  res.render('index', context);

});

app.get('/account', function (req, res) {

	var context = {};
	res.render('account', context);

});

app.get('/product',function(req,res){

  var context = {};
  res.render('product', context);

});

app.get('/cart', function (req, res) {

	var context = {};
	res.render('cart', context);

});

app.get('/category', function (req, res) {

	var context = {};
	res.render('category', context);

});

app.get('/order',function(req,res){

  var context = {};
  res.render('order', context);

});

app.get('/payment', function (req, res) {

	var context = {};
	res.render('payment', context);

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
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
