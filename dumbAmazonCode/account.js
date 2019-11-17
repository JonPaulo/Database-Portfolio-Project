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

	/*Display all categories. Requires web based javascript to delete users with AJAX*/
	router.get('/', function (req, res) {
		var callbackCount = 0;
		var context = {};
		context.jsscripts = ["deleteAccount.js", "searchCategories.js"];
		var mysql = req.app.get('mysql');
		getAccount(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('account', context);
			}

		}
	});

	// function getAccountAfterUpdate(res, mysql, context, id, complete) {
	// 	var sql = "SELECT id, username, password, email, fname, lname, street, city, zip FROM account";
	// 	var inserts = [id];
	// 	mysql.pool.query(sql, inserts, function (error, results, fields) {
	// 		if (error) {
	// 			res.write(JSON.stringify(error));
	// 			res.end();
	// 		}
	// 		context.account = results[0];
	// 		complete();
	// 	});
	// }

	/* Display one categories for the specific purpose of updating categories */
	// router.get('/:id', function (req, res) {
	// 	callbackCount = 0;
	// 	var context = {};
	// 	context.jsscripts = ["updateAccount.js"];
	// 	var mysql = req.app.get('mysql');
	// 	getAccountAfterUpdate(res, mysql, context, req.params.id, complete);
	// 	function complete() {
	// 		callbackCount++;
	// 		if (callbackCount >= 1) {
	// 			res.render('account', context);
	// 		}
	//
	// 	}
	// });


	/* Route to delete a categories, simply returns a 202 upon success. Ajax will handle this. */
	router.delete('/:id', function (req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM account WHERE id = ?";
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
