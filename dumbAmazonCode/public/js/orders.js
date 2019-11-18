module.exports = function () {
	var express = require('express');
	var router = express.Router();

	function getOrders(res, mysql, context, complete) {
		mysql.pool.query("SELECT id, user_id, payment_id, order_date, order_total FROM orders", function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.orders = results;
			complete();
		});
	}

	function getAccount(res, mysql, context, complete) {
		mysql.pool.query("SELECT id, username, password, email, fname, lname, street, city, zip FROM account", function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.account = results;
			complete();
		});
	}

	function getPayment(res, mysql, context, complete) {
		mysql.pool.query("SELECT id, user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year FROM payment", function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.payment = results;
			complete();
		});
	}


	/* Find product whose name includes the given string in the req */
	function searchFunction(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT id, user_id, payment_id, order_date, order_total FROM orders WHERE " + req.query.filter + " LIKE " + mysql.pool.escape('%' + req.query.search + '%');
		console.log(query)
		mysql.pool.query(query, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.orders = results;
			complete();
		});
	}

	/*Display all product. Requires web based javascript to delete users with AJAX*/
	router.get('/', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		getOrders(res, mysql, context, complete);
		getAccount(res, mysql, context, complete);
		getPayment(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 3) {
				res.render('orders', context);
			}

		}
	});

	/*Display all product whose name starts with a given string. */
	router.get('/search', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		searchFunction(req, res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('orders', context);
			}
		}
	});

	/* Adds a categories, redirects to the product page after adding */
	router.post('/add', function (req, res) {
		console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO orders (user_id, payment_id, order_total, order_date) VALUES (?, ?, ?, ?)";
		var inserts = [req.body.newUserID, req.body.newPaymentID, req.body.newTotal,
			req.body.newDate];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				console.log(JSON.stringify(error))
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/orders');
			}
		});
	});

	/* updates a product, redirects to the product page after adding */
	router.post('/update', function (req, res) {
		console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "UPDATE orders SET user_id=?, payment_id=?, order_date=?, order_total=? WHERE id = ?";
		var inserts = [req.body.updateUserID, req.body.updatePaymentID, req.body.updateOrderDate,  req.body.updateOrderTotal, req.body.updateID];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				console.log(JSON.stringify(error))
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/orders');
			}
		});
	});

	/* delete a product, redirects to the product page after deleting */
	router.post('/delete', function (req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM orders WHERE id = ?";
		var inserts = [req.body.deleteID];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				console.log(error)
				res.write(JSON.stringify(error));
				res.status(400);
				res.end();
			} else {
				res.redirect('/orders');
			}
		})
	})

	return router;
}();
