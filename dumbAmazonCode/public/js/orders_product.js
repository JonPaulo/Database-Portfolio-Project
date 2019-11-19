module.exports = function () {
	var express = require('express');
	var router = express.Router();

	/* get product */
	function getProduct(res, mysql, context, complete) {
		sql = "SELECT id, name, price, inventory FROM product";
		mysql.pool.query(sql, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end()
			}
			context.product = results
			complete();
		});
	}

	/* get people with their certificates */
    /* TODO: get multiple certificates in a single column and group on
     * fname+lname or id column
     */
	function getOrders_product(req, res, mysql, context, complete) {
		sql = "SELECT orders_id, product_id, product.name, product.price, quantity, subtotal FROM orders_product INNER JOIN product on orders_product.product_id = product.id WHERE orders_id = " + mysql.pool.escape(req.query.id);
		//sql = "SELECT pid, cid, CONCAT(fname,' ',lname) AS name, title AS certificate FROM bsg_people INNER JOIN bsg_cert_people on bsg_people.character_id = bsg_cert_people.pid INNER JOIN bsg_cert on bsg_cert.certification_id = bsg_cert_people.cid ORDER BY name, certificate"
		mysql.pool.query(sql, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end()
			}
			context.orders_product = results
			complete();
		});
	}

	function getNewPrice(req, res, mysql, context, complete) {
		sql = "SELECT price, inventory FROM product WHERE id = " + mysql.pool.escape(req.body.newProductID);
		mysql.pool.query(sql, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end()
			}
			context.product = results
			complete();
		});
	}

	function getUpdatePrice(req, res, mysql, context, complete) {
		sql = "SELECT price, inventory FROM product WHERE id = " + mysql.pool.escape(req.body.updateProductID);
		mysql.pool.query(sql, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end()
			}
			context.product = results
			complete();
		});
	}

    /* List people with certificates along with 
     * displaying a form to associate a person with multiple certificates
     */
	router.get('/', function (req, res) {
		var callbackCount = 0;
		var context = {};
		//context.jsscripts = ["deleteperson.js"];
		var mysql = req.app.get('mysql');
		var handlebars_file = 'orders_product'
		context.this_id = req.query.id;

		//getOrders(res, mysql, context, complete);
		getOrders_product(req, res, mysql, context, complete);
		getProduct(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 2) {
				res.render(handlebars_file, context);
			}
		}
	});

	/* Adds a orders_product, redirects to the orders_product page after adding */
	router.post('/add', function (req, res) {
		var callbackCount = 0;
		var context1 = {};
		var mysql = req.app.get('mysql');

		// get the price and inventory of the item first
		getNewPrice(req, res, mysql, context1, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				// add the item
				var total = context1.product[0].price * req.body.newQuantity;
				var sql = "INSERT INTO orders_product (orders_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)";
				var inserts = [req.body.newOrdersID, req.body.newProductID, req.body.newQuantity, total];
				sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
					if (error) {
						console.log(JSON.stringify(error))
						res.write(JSON.stringify(error));
						res.end();
					} else {
						res.redirect('/orders_product?id=' + req.body.newOrdersID);
					}
				});
			}
		}
	});

	/* updates a orders_product, redirects to the orders_product page after adding */
	router.post('/update', function (req, res) {
		console.log(req.body);
		var callbackCount = 0;
		var context1 = {};
		var mysql = req.app.get('mysql');

		// get the price and inventory of the item first
		getUpdatePrice(req, res, mysql, context1, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				// update the item
				console.log(context1.product[0].price);
				console.log(req.body.updateQuantity);
				var total = context1.product[0].price * req.body.updateQuantity;
				var sql = "UPDATE orders_product SET quantity = ?, subtotal = ? WHERE orders_id = ? AND product_id = ?";
				var inserts = [req.body.updateQuantity, total, req.body.updateOrdersID, req.body.updateProductID];
				sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
					if (error) {
						console.log(JSON.stringify(error))
						res.write(JSON.stringify(error));
						res.end();
					} else {
						res.redirect('/orders_product?id=' + req.body.updateOrdersID);
					}
				});
			}
		}
	});

	/* delete a orders_product, redirects to the orders_product page after deleting */
	router.post('/delete', function (req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM orders_product WHERE orders_id = ? AND product_id = ?";
		var inserts = [req.body.ordersID, req.body.productID];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				console.log(error)
				res.write(JSON.stringify(error));
				res.status(400);
				res.end();
			} else {
				res.redirect('/orders_product?id=' + req.body.ordersID);
			}
		})
	})

	return router;
}();