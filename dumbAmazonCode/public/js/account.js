module.exports = function () {
	var express = require('express');
	var router = express.Router();

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

	/* Find categories whose name includes the given string in the req */
	function searchFunction(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT id, username, password, email, fname, lname, street, city, zip FROM account WHERE " + req.query.filter + " LIKE " + mysql.pool.escape('%' + req.query.search + '%');
		console.log(query)
		mysql.pool.query(query, function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.account = results;
			complete();
		});
	}

	/*Display all categories. Requires web based javascript to delete users with AJAX*/
	router.get('/', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		getAccount(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('account', context);
			}

		}
	});

	/*Display all categories whose name starts with a given string. */
	router.get('/search', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');

		searchFunction(req, res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('account', context);
			}
		}
	});

	/* Adds a categories, redirects to the categories page after adding */
	router.post('/add', function (req, res) {
		console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO account (username, password, email, fname, lname, street, city, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
		var inserts = [req.body.newUsername, req.body.newPassword, req.body.newEmail,
			req.body.newFname, req.body.newLname, req.body.newStreet, req.body.newCity,
			req.body.newZip];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				console.log(JSON.stringify(error))
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/account');
			}
		});
	});

	/* updates a categories, redirects to the categories page after adding */
	router.post('/update', function (req, res) {
		console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "UPDATE account SET username = ?, password=?, email=?, fname=?, lname=?, street=?, city=?, zip=? WHERE id = ?";
		var inserts = [req.body.editUsername, req.body.editPassword, req.body.editEmail,
			req.body.editFname, req.body.editLname, req.body.editStreet, req.body.editCity,
			req.body.editZip, req.body.updateID];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				console.log(JSON.stringify(error))
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/account');
			}
		});
	});

	/* delete a categories, redirects to the categories page after deleting */
	router.post('/delete', function (req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM account WHERE id = ?";
		var inserts = [req.body.deleteID];
		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
			if (error) {
				console.log(error)
				res.write(JSON.stringify(error));
				res.status(400);
				res.end();
			} else {
				res.redirect('/account');
			}
		})
	})

	return router;
}();
