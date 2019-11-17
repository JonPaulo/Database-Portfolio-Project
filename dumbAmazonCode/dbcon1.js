var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'classmysql.engr.oregonstate.edu',
	user: 'cs340_bautijon',
	password: 'hdBjp6dQfUfRtOKm',
	database: 'cs340_bautijon'
});
module.exports.pool = pool;
