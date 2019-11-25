

module.exports = function () {
	var express = require('express');
	var router = express.Router();
	var moment = require('moment');

	function getOrders(res, mysql, context, complete) {
		mysql.pool.query("SELECT id as oid, user_id, payment_id, order_date FROM orders", function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.orders = results;
			complete();
		});
	}

	function getOrders_account(res, mysql, context, complete) {
		mysql.pool.query("SELECT orders.id, username, payment_id, order_date FROM account INNER JOIN orders on orders.user_id = account.id", function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.orders_account = results;
			var i;
			for (i = 0; i < results.length; i++) {
				if ((context.orders_account)[i].id in orderSubtotals) {
					(context.orders_account)[i].order_total = orderSubtotals[(context.orders_account)[i].id];
				}
				else {
					(context.orders_account)[i].order_total = 0;
				}
				(context.orders_account)[i].order_date = moment((context.orders_account)[i].order_date).format('MM/DD/YYYY');
			}
			complete();
		});
	}

	function getOrders_product(res, mysql, context, complete) {
		mysql.pool.query("SELECT orders_id, product_id, quantity, subtotal FROM orders_product", function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.orders_product = results;
			orderSubtotals = new Object();
			var i;
			for (i = 0; i < results.length; i++) {
				if (!(results[i].orders_id in orderSubtotals)) {
					orderSubtotals[results[i].orders_id] = results[i].subtotal;
				}
				else {
					orderSubtotals[results[i].orders_id] += results[i].subtotal;
				}
			}
			// console.log(context.orders_product);
			// console.log(results[0].subtotal);
			context.order_subtotal = orderSubtotals;
			console.log(orderSubtotals);
			complete();
		});
	}

	function getPayment_account(res, mysql, context, complete) {
		mysql.pool.query("SELECT payment.id, username FROM payment INNER JOIN account on payment.user_id = account.id", function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.payment_account = results;
			complete();
		});
	}

	function getAccount(res, mysql, context, complete) {
		mysql.pool.query("SELECT id, username FROM account", function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.account = results;
			complete();
		});
	}

	/* Find order whose name includes the given string in the req */
	function searchFunction(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT id, user_id, payment_id, order_date FROM orders WHERE " + req.query.filter + " LIKE " + mysql.pool.escape('%' + req.query.search + '%');
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

	/*Display all orders. Requires web based javascript to delete users with AJAX*/
	router.get('/', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		//getOrders(res, mysql, context, complete);
		getOrders_product(res, mysql, context, complete);
		getOrders_account(res, mysql, context, complete);
		getPayment_account(res, mysql, context, complete);
		getAccount(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 4) {
				res.render('orders', context);
			}

		}
	});

	/*Display all orders whose name starts with a given string. */
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

	/* Adds an order, redirects to the order page after adding */
	router.post('/add', function (req, res) {
		console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO orders (user_id, payment_id, order_date) VALUES (?, ?, 0, ?)";
		var inserts = [req.body.newUserID, req.body.newPaymentID, req.body.newDate];
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

	/* updates an order, redirects to the order page after adding */
	router.post('/update', function (req, res) {
		console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "UPDATE orders SET user_id=?, payment_id=?, order_date=? WHERE id = ?";
		var inserts = [req.body.updateUserID, req.body.updatePaymentID, req.body.updateOrderDate, req.body.updateID];
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

	/* delete an order, redirects to the order page after deleting */
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
