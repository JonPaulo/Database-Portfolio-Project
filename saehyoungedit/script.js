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

app.get('/seller', function (req, res) {

	var context = {};
	res.render('seller', context);

});

app.get('/create',function(req,res){

  var context = {};
  res.render('create', context);

});

app.get('/login',function(req,res){

  var context = {};
  res.render('login', context);

});

app.get('/settings',function(req,res){

  var context = {};
  res.render('settings', context);

});

app.get('/ordersdb',function(req,res){
  var context = {};
  var params = [];

  // pool.query('select * from actor', (err, rows) => {
  //   for (var p in req.body)
  //   {
  //     params.push({'orderNumber': p});
  //   }
  //   console.log(rows);
  //   context.data = rows;
  // });
  //
  // req.addEventListener('load', function() {
  //   if (req.status >= 200 && req.status < 400) {
  //     console.log(JSON.parse(req.responseText));
  //     document.getElementById("data").textContent = req.responseText;
  //   } else {
  //     console.log("Error in network request: " + req.statusText);
  //     document.getElementById("data").textContent = "Error in network request: " + req.statusText;
  //   }
  // });
  //
  // context.list = params;
  // // console.log(params);
  //
  // pool.end((err) => {
  //   // The connection is terminated gracefully
  //   // Ensures all previously enqueued queries are still
  //   // before sending a COM_QUIT packet to the MySQL server.
  // });

  res.render('ordersdb', context);

});

app.get('/cartdb',function(req,res){

  var context = {};
  res.render('cartdb', context);

});

app.get('/productsdb',function(req,res){

  var context = {};
  res.render('productsdb', context);

});

app.get('/addproducts',function(req,res){

  var context = {};
  res.render('addproducts', context);

});

app.post('/confirmed',function(req, res, next){
  var context = {};
  var params = [];

  if(req.body['submitAddCard']) {
    var card_num = req.body.card_num;

    context.card_num = card_num;
    req.session.card_num = card_num;

    res.render('confirmed', context);
  }
  else {
    console.log('req.body["submitAddCard"] not detected');
    console.log(req.body);
  }
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
