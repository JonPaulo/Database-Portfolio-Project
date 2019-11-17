module.exports = function () {
	var express = require('express');
	var router = express.Router();

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

	/* Find categories whose fname starts with a given string in the req */
	function getCategoriesWithNameLike(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT id, name FROM categories WHERE name LIKE " + mysql.pool.escape(req.params.s + '%');
		console.log(query)

		mysql.pool.query(query, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.categories = results;
			complete();
		});
	}

	function getOneCategories(res, mysql, context, id, complete) {
		var sql = "SELECT id, name FROM categories WHERE id = ?";
		var inserts = [id];
		mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.categories = results[0];
			complete();
		});
	}

	/*Display all categories. Requires web based javascript to delete users with AJAX*/
	router.get('/', function (req, res) {
		var callbackCount = 0;
		var context = {};
		context.jsscripts = ["deleteCategories.js", "searchCategories.js"];
		var mysql = req.app.get('mysql');
		getCategories(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('categories', context);
			}

		}
	});

	/*Display all categories whose name starts with a given string. Requires web based javascript to delete users with AJAX */
	router.get('/search/:s', function (req, res) {
		var callbackCount = 0;
		var context = {};
		context.jsscripts = ["deleteCategories.js", "searchCategories.js"];
		var mysql = req.app.get('mysql');
		getCategoriesWithNameLike(req, res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('categories', context);
			}
		}
	});

	/* Display one categories for the specific purpose of updating categories */
	router.get('/:id', function (req, res) {
		callbackCount = 0;
		var context = {};
		context.jsscripts = ["updateCategories.js"];
		var mysql = req.app.get('mysql');
		getOneCategories(res, mysql, context, req.params.id, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('update-categories', context);
			}

		}
	});

	/* Adds a categories, redirects to the categories page after adding */
	router.post('/', function (req, res) {
		console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO categories (name) VALUES (?)";
		var inserts = [req.body.newCategoryName];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				console.log(JSON.stringify(error))
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/categories');
			}
		});
	});

	/* The URI that update data is sent to in order to update a categories */
	router.put('/:id', function (req, res) {
		var mysql = req.app.get('mysql');
		console.log(req.body)
		console.log(req.params.id)
		var sql = "UPDATE categories SET name=? WHERE id=?";
		var inserts = [req.body.name, req.params.id];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				console.log(error)
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.status(200);
				res.end();
			}
		});
	});

	/* Route to delete a categories, simply returns a 202 upon success. Ajax will handle this. */
	router.delete('/:id', function (req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM categories WHERE id = ?";
		var inserts = [req.params.id];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				console.log(error)
				res.write(JSON.stringify(error));
				res.status(400);
				res.end();
			} else {
				res.status(202).end();
			}
		})
	})

	return router;
}();