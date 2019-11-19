module.exports = function () {
	var express = require('express');
	var router = express.Router();

	function resetTables(res, mysql, context, complete) {
		mysql.pool.query("SET foreign_key_checks = 0; \
DROP TABLE IF EXISTS`order_product`; \
		DROP TABLE IF EXISTS`orders`; \
		DROP TABLE IF EXISTS`payment`; \
		DROP TABLE IF EXISTS`account`; \
		DROP TABLE IF EXISTS`product`; \
		DROP TABLE IF EXISTS`categories`; \
		SET foreign_key_checks = 1; \
 \
		CREATE TABLE`account`( \
			`id` int(10) NOT NULL AUTO_INCREMENT, \
			`username` varchar(20) NOT NULL, \
			`password` varchar(50) NOT NULL, \
			`email` varchar(255) NOT NULL, \
			`fname` varchar(30) NOT NULL, \
			`lname` varchar(30) NOT NULL, \
			`street` varchar(30) NOT NULL, \
			`city` varchar(20) NOT NULL, \
			`zip` varchar(10) NOT NULL, \
			PRIMARY KEY(`id`), \
			UNIQUE`full_name`(fname, lname) \
		)  ENGINE = InnoDB DEFAULT CHARSET = latin1; \
 \
		CREATE TABLE`payment`( \
			`id` int(10) NOT NULL AUTO_INCREMENT, \
			`user_id` int(10) NOT NULL, \
			`fname` varchar(30) NOT NULL, \
			`lname` varchar(30) NOT NULL, \
			`street` varchar(30) NOT NULL, \
			`city` varchar(20) NOT NULL, \
			`zip` varchar(10) NOT NULL, \
			`card_num` varchar(16) NOT NULL, \
			`exp_month` int(2) NOT NULL, \
			`exp_year` int(2) NOT NULL, \
			PRIMARY KEY(`id`), \
			FOREIGN KEY(user_id) REFERENCES account(id) ON DELETE CASCADE \
		)  ENGINE = InnoDB DEFAULT CHARSET = latin1; \
 \
		CREATE TABLE`orders`( \
			`id` int(10) NOT NULL AUTO_INCREMENT, \
			`user_id` int(10) NOT NULL, \
			`payment_id` int(10) NOT NULL, \
			`order_date` date NOT NULL, \
			`order_total` decimal(10, 2) NOT NULL, \
			PRIMARY KEY(`id`), \
			FOREIGN KEY(user_id) REFERENCES account(id) ON DELETE CASCADE, \
			FOREIGN KEY(payment_id) REFERENCES payment(id) ON DELETE CASCADE \
		)  ENGINE = InnoDB DEFAULT CHARSET = latin1; \
 \
		CREATE TABLE`categories`( \
			`id` int(10) AUTO_INCREMENT NOT NULL, \
			`name` varchar(255) NOT NULL, \
			PRIMARY KEY(`id`) \
		)  ENGINE = InnoDB DEFAULT CHARSET = latin1; \
 \
		CREATE TABLE`product`( \
			`id` int(10) NOT NULL AUTO_INCREMENT, \
			`name` varchar(255) NOT NULL, \
			`price` decimal(8, 2) NOT NULL, \
			`inventory` int(10) NOT NULL, \
			`category_id` int(10) NULL, \
			PRIMARY KEY(`id`), \
			FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE \
		)  ENGINE = InnoDB DEFAULT CHARSET = latin1; \
 \
		CREATE TABLE`order_product`( \
			`order_id` int(10) NOT NULL AUTO_INCREMENT, \
			`product_id` int(10) NOT NULL, \
			`quantity` int(3) NOT NULL, \
			`price` decimal(8, 2) NOT NULL, \
			PRIMARY KEY(`order_id`), \
			FOREIGN KEY(`order_id`) REFERENCES orders(id) ON DELETE CASCADE, \
			FOREIGN KEY(`product_id`) REFERENCES product(id) ON DELETE CASCADE \
		)  ENGINE = InnoDB DEFAULT CHARSET = latin1;", function (error, results, fields) {
			if (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			complete();
		});
	}


//	function resetTables(res, mysql, context, complete) {
//		mysql.pool.query("DROP TABLE IF EXISTS`order_product`; \
//			"DROP TABLE IF EXISTS`orders`; \
//			"DROP TABLE IF EXISTS`payment`;" +
//			"DROP TABLE IF EXISTS`account`;" +
//			"DROP TABLE IF EXISTS`product`;" +
//			"DROP TABLE IF EXISTS`categories`;" +

//			"CREATE TABLE`account`(" +
//			"`id` int(10) NOT NULL AUTO_INCREMENT," +
//			"`username` varchar(20) NOT NULL," +
//			"`password` varchar(50) NOT NULL," +
//			"`email` varchar(255) NOT NULL," +
//			"`fname` varchar(30) NOT NULL," +
//			"`lname` varchar(30) NOT NULL," +
//			"`street` varchar(30) NOT NULL," +
//			"`city` varchar(20) NOT NULL," +
//			"`zip` varchar(10) NOT NULL," +
//			"PRIMARY KEY(`id`)," +
//			"UNIQUE`full_name`(fname, lname)" +
//			")  ENGINE = InnoDB DEFAULT CHARSET = latin1;" +

//			"CREATE TABLE`payment`(" +
//			"`id` int(10) NOT NULL AUTO_INCREMENT," +
//			"`user_id` int(10) NOT NULL," +
//			"`fname` varchar(30) NOT NULL," +
//			"`lname` varchar(30) NOT NULL," +
//			"`street` varchar(30) NOT NULL," +
//			"`city` varchar(20) NOT NULL," +
//			"`zip` varchar(10) NOT NULL," +
//			"`card_num` varchar(16) NOT NULL," +
//			"`exp_month` int(2) NOT NULL," +
//			"`exp_year` int(2) NOT NULL," +
//			"PRIMARY KEY(`id`)," +
//			"FOREIGN KEY(user_id) REFERENCES account(id) ON DELETE CASCADE" +
//			")  ENGINE = InnoDB DEFAULT CHARSET = latin1;" +

//			"CREATE TABLE`orders`(" +
//			"`id` int(10) NOT NULL AUTO_INCREMENT," +
//			"`user_id` int(10) NOT NULL," +
//			"`payment_id` int(10) NOT NULL," +
//			"`order_date` date NOT NULL," +
//			"`order_total` decimal(10, 2) NOT NULL," +
//			"PRIMARY KEY(`id`)," +
//			"FOREIGN KEY(user_id) REFERENCES account(id) ON DELETE CASCADE," +
//			"FOREIGN KEY(payment_id) REFERENCES payment(id) ON DELETE CASCADE" +
//			")  ENGINE = InnoDB DEFAULT CHARSET = latin1;" +

//			"CREATE TABLE`categories`(" +
//			"`id` int(10) AUTO_INCREMENT NOT NULL," +
//			"`name` varchar(255) NOT NULL," +
//			"PRIMARY KEY(`id`)" +
//			")  ENGINE = InnoDB DEFAULT CHARSET = latin1;" +

//			"CREATE TABLE`product`(" +
//			"`id` int(10) NOT NULL AUTO_INCREMENT," +
//			"`name` varchar(255) NOT NULL," +
//			"`price` decimal(8, 2) NOT NULL," +
//			"`inventory` int(10) NOT NULL," +
//			"`category_id` int(10) NULL," +
//			"PRIMARY KEY(`id`)," +
//			"FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE" +
//			")  ENGINE = InnoDB DEFAULT CHARSET = latin1;" +

//			"CREATE TABLE`order_product`(" +
//			"`order_id` int(10) NOT NULL AUTO_INCREMENT," +
//			"`product_id` int(10) NOT NULL," +
//			"`quantity` int(3) NOT NULL," +
//			"`price` decimal(8, 2) NOT NULL," +
//			"PRIMARY KEY(`order_id`)," +
//			"FOREIGN KEY(`order_id`) REFERENCES orders(id) ON DELETE CASCADE," +
//			"FOREIGN KEY(`product_id`) REFERENCES product(id) ON DELETE CASCADE" +
//			")  ENGINE = InnoDB DEFAULT CHARSET = latin1; ", function (error, results, fields) {
//		if (error) {
//			res.write(JSON.stringify(error));
//			res.end();
//		}
//		context.account = results;
//		complete();
//	});
//}


/*Display all categories. Requires web based javascript to delete users with AJAX*/
router.get('/', function (req, res) {
	var callbackCount = 0;
	var context = {};
	var mysql = req.app.get('mysql');
	resetTables(res, mysql, context, complete);
	function complete() {
		callbackCount++;
		if (callbackCount >= 1) {
			res.render('/', context);
		}

	}
});

return router;
}();
