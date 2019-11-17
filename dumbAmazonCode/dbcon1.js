var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'classmysql.engr.oregonstate.edu',
	user: 'fillmein',
	password: 'fillmein',
	database: 'fillmein'
});
module.exports.pool = pool;