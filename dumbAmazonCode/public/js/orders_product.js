module.exports = function () {
	var express = require('express');
	var router = express.Router();

	///* get people to populate in dropdown */
	//function getPeople(res, mysql, context, complete) {
	//	mysql.pool.query("SELECT character_id AS pid, fname, lname FROm bsg_people", function (error, results, fields) {
	//		if (error) {
	//			res.write(JSON.stringify(error));
	//			res.end();
	//		}
	//		context.people = results;
	//		complete();
	//	});
	//}

	/* get product */
	//function getProduct(res, mysql, context, complete) {
	//	sql = "SELECT id, name FROM product";
	//	mysql.pool.query(sql, function (error, results, fields) {
	//		if (error) {
	//			res.write(JSON.stringify(error));
	//			res.end()
	//		}
	//		context.certificates = results
	//		complete();
	//	});
	//}

	/* get people with their certificates */
    /* TODO: get multiple certificates in a single column and group on
     * fname+lname or id column
     */
	function getOrders_product(req, res, mysql, context, complete) {
		sql = "SELECT orders.id as oid, product_id as pid, quantity, price FROM orders_product WHERE oid = " + mysql.pool.escape(req.query.id) + " INNER JOIN product on pid = product.id";
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


    /* List people with certificates along with 
     * displaying a form to associate a person with multiple certificates
     */
	router.get('/', function (req, res) {
		var callbackCount = 0;
		var context = {};
		//context.jsscripts = ["deleteperson.js"];
		var mysql = req.app.get('mysql');
		var handlebars_file = 'orders_product'

		//getOrders(res, mysql, context, complete);
		getOrders_product(req, res, mysql, context, complete);
		//getProduct(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 2) {
				res.render(handlebars_file, context);
			}
		}
	});

 //   /* Associate certificate or certificates with a person and 
 //    * then redirect to the people_with_certs page after adding 
 //    */
	//router.post('/', function (req, res) {
	//	console.log("We get the multi-select certificate dropdown as ", req.body.certs)
	//	var mysql = req.app.get('mysql');
	//	// let's get out the certificates from the array that was submitted by the form 
	//	var certificates = req.body.certs
	//	var person = req.body.pid
	//	for (let cert of certificates) {
	//		console.log("Processing certificate id " + cert)
	//		var sql = "INSERT INTO bsg_cert_people (pid, cid) VALUES (?,?)";
	//		var inserts = [person, cert];
	//		sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
	//			if (error) {
	//				//TODO: send error messages to frontend as the following doesn't work
	//				/* 
	//				res.write(JSON.stringify(error));
	//				res.end();
	//				*/
	//				console.log(error)
	//			}
	//		});
	//	} //for loop ends here 
	//	res.redirect('/orders_product');
	//});

	///* Delete a person's certification record */
 //   /* This route will accept a HTTP DELETE request in the form
 //    * /pid/{{pid}}/cert/{{cid}} -- which is sent by the AJAX form 
 //    */
	//router.delete('/pid/:pid/cert/:cid', function (req, res) {
	//	//console.log(req) //I used this to figure out where did pid and cid go in the request
	//	console.log(req.params.pid)
	//	console.log(req.params.cid)
	//	var mysql = req.app.get('mysql');
	//	var sql = "DELETE FROM bsg_cert_people WHERE pid = ? AND cid = ?";
	//	var inserts = [req.params.pid, req.params.cid];
	//	sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
	//		if (error) {
	//			res.write(JSON.stringify(error));
	//			res.status(400);
	//			res.end();
	//		} else {
	//			res.status(202).end();
	//		}
	//	})
	//})

	return router;
}();