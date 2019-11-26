module.exports = function () {
	var express = require('express');
	var router = express.Router();

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

	/* Find categories whose name includes the given string in the req */
	function getCategoriesWithNameLike(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT id, name FROM categories WHERE name LIKE " + mysql.pool.escape('%' + req.query.searchName + '%');

		mysql.pool.query(query, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.categories = results;
			complete();
		});
	}

	/*Display all categories. Requires web based javascript to delete users with AJAX*/
	router.get('/', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		getCategories(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('categories', context);
			}

		}
	});

	/*Display all categories whose name starts with a given string. */
	router.get('/search', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		getCategoriesWithNameLike(req, res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('categories', context);
			}
		}
	});

	/* Adds a categories, redirects to the categories page after adding */
	router.post('/add', function (req, res) {
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO categories (name) VALUES (?)";
		var inserts = [req.body.newName];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/categories');
			}
		});
	});

	/* updates a categories, redirects to the categories page after adding */
	router.post('/update', function (req, res) {
		var mysql = req.app.get('mysql');
		var sql = "UPDATE categories SET name = ? WHERE id = ?";
		var inserts = [req.body.updateName, req.body.updateID];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/categories');
			}
		});
	});

	/* delete a categories, redirects to the categories page after deleting */
	router.post('/delete', function (req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM categories WHERE id = ?";
		var inserts = [req.body.deleteID];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.status(400);
				res.end();
			} else {
				res.redirect('/categories');
			}
		})
	})

	return router;
}();
