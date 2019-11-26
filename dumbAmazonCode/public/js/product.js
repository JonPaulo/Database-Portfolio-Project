module.exports = function () {
	var express = require('express');
	var router = express.Router();

		// get columns to display from product_categories joined table
		function getProduct(res, mysql, context, complete) {
			mysql.pool.query("SELECT product.id as id, product.name as name, price, categories_id, categories.name as categories_name FROM product LEFT JOIN categories on product.categories_id = categories.id", function (error, results, fields) {
				if (error) {
					res.write(JSON.stringify(error));
					res.end();
				}
				context.product = results;
				complete();
			});
		}

		// get columns to display from categories table
		function getCategories(res, mysql, context, complete) {
			mysql.pool.query("SELECT id, name FROM categories", function (error, results, fields) {
				if (error) {
					res.write(JSON.stringify(error));
					res.end();
				}
				context.categories = results;
				complete();
			});
		}

	/* Find product whose name includes the given string in the req */
	function searchFunction(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT id, name, price, categories_id FROM product WHERE " + req.query.filter + " LIKE " + mysql.pool.escape('%' + req.query.search + '%');
		mysql.pool.query(query, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.product = results;
			complete();
		});
	}

	/*Display all products. Requires web based javascript to delete users with AJAX*/
	router.get('/', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		getProduct(res, mysql, context, complete);
		getCategories(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 2) {
				res.render('product', context);
			}

		}
	});

	/*Display all products whose name starts with a given string. */
	router.get('/search', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');

		searchFunction(req, res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('product', context);
			}
		}
	});

	/* Adds a product, redirects to the product page after adding */
	router.post('/add', function (req, res) {
		var mysql = req.app.get('mysql');
		if (req.body.newCategories == "NULL") {
			var sql = "INSERT INTO product (name, price) VALUES (?, ?)";
			var inserts = [req.body.newProductName, req.body.newPrice];
		}
		else {
			var sql = "INSERT INTO product (name, price, categories_id) VALUES (?, ?, ?)";
			var inserts = [req.body.newProductName, req.body.newPrice, req.body.newCategories];
		}
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/product');
			}
		});
	});

	/* updates a product, redirects to the product page after adding */
	router.post('/update', function (req, res) {
		var mysql = req.app.get('mysql');
		if (req.body.updateCategories_id == "NULL") {
			var sql = "UPDATE product SET name=?, price=?, categories_id=NULL WHERE id = ?";
			var inserts = [req.body.updateName, req.body.updatePrice, req.body.updateID];
		}
		else {
			var sql = "UPDATE product SET name=?, price=?, categories_id=? WHERE id = ?";
			var inserts = [req.body.updateName, req.body.updatePrice, req.body.updateCategories_id, req.body.updateID];
		}
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/product');
			}
		});
	});

	/* delete a product, redirects to the product page after deleting */
	router.post('/delete', function (req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM product WHERE id = ?";
		var inserts = [req.body.deleteID];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.status(400);
				res.end();
			} else {
				res.redirect('/product');
			}
		})
	})

	return router;
}();
