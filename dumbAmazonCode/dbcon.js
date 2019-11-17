var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'classmysql.engr.oregonstate.edu',
	user: 'cs340_ohsa',
	password: 'group9',
	database: 'cs340_ohsa'
});
module.exports.pool = pool;