

module.exports = function () {
	var express = require('express');
	var router = express.Router();
	var moment = require('moment');

	// get columns to display from orders_account joined tables
	function getOrders_account(res, mysql, context, complete) {
		mysql.pool.query("SELECT orders.id as id, username, payment_id, order_date FROM account INNER JOIN orders on orders.user_id = account.id", function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.orders_account = results;
			var i;
			for (i = 0; i < results.length; i++) {
				if ((context.orders_account)[i].id in orderSubtotals) {
					// reference: https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-currency-string-in-javascript
					(context.orders_account)[i].order_total = orderSubtotals[(context.orders_account)[i].id].toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
				}
				else {
					(context.orders_account)[i].order_total = (0).toFixed(2);
				}
				(context.orders_account)[i].order_date_formatted = (context.orders_account)[i].order_date;
				(context.orders_account)[i].order_date_formatted = moment((context.orders_account)[i].order_date).format('MM/DD/YYYY');
				(context.orders_account)[i].order_date = moment((context.orders_account)[i].order_date).format('YYYY-MM-DD');
			}
			complete();
		});
	}

	// get columns to display from orders_product joined tables
	function getOrders_product(req, res, mysql, context, complete) {
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
			context.order_subtotal = orderSubtotals;
			complete();
			if (req.query.search) {
				searchFunction(req, res, mysql, context, complete);
			}
			else {
				getOrders_account(res, mysql, context, complete);
			}
		});
	}

	// get columns to display from payment_account joined tables
	function getPayment_account(res, mysql, context, complete) {
		mysql.pool.query("SELECT payment.id as pid, user_id as uid, username FROM payment INNER JOIN account on payment.user_id = account.id", function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.payment_account = results;

			var accountPayment = {};
			var i;
			for (i = 0; i < results.length; i++) {
				if (!(results[i].username in accountPayment)) {
					accountPayment[results[i].username] = {
						uid: results[i].uid, username: results[i].username, pid: []};
				}
				accountPayment[results[i].username].pid.push(results[i].pid);
			}
			context.accountPayment = accountPayment;

			complete();
		});
	}

	// get columns to display from account table
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
		var query = "SELECT orders.id as id, username, payment_id, order_date FROM account INNER JOIN orders on orders.user_id = account.id WHERE " + req.query.filter + " LIKE " + mysql.pool.escape('%' + req.query.search + '%');
		mysql.pool.query(query, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.orders_account = results;
			for (i = 0; i < results.length; i++) {
				if ((context.orders_account)[i].id in orderSubtotals) {
					// reference: https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-currency-string-in-javascript
					(context.orders_account)[i].order_total = orderSubtotals[(context.orders_account)[i].id].toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
				}
				else {
					(context.orders_account)[i].order_total = (0).toFixed(2);
				}
				(context.orders_account)[i].order_date_formatted = (context.orders_account)[i].order_date;
				(context.orders_account)[i].order_date_formatted = moment((context.orders_account)[i].order_date).format('MM/DD/YYYY');
				(context.orders_account)[i].order_date = moment((context.orders_account)[i].order_date).format('YYYY-MM-DD');
			}
			complete();
		});
	}

	/*Display all orders. Requires web based javascript to delete users with AJAX*/
	router.get('/', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		getOrders_product(req, res, mysql, context, complete);
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
		getOrders_product(req, res, mysql, context, complete);
		getPayment_account(res, mysql, context, complete);
		getAccount(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 4) {
				res.render('orders', context);
			}
		}
	});

	/* Adds an order, redirects to the order page after adding */
	router.post('/add', function (req, res) {
		var parsed = req.body.newPaymentID.split("-");
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO orders (user_id, payment_id, order_date) VALUES (?, ?, ?)";
		var inserts = [parsed[0], parsed[1], req.body.newDate];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/orders');
			}
		});
	});

	/* updates an order, redirects to the order page after adding */
	router.post('/update', function (req, res) {
		var parsed = req.body.newPaymentID.split("-");
		var mysql = req.app.get('mysql');
		var sql = "UPDATE orders SET user_id=?, payment_id=?, order_date=? WHERE id = ?";
		var inserts = [parsed[0], parsed[1], req.body.updateOrderDate, req.body.updateID];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
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
		var inserts = [req.body.id];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
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
