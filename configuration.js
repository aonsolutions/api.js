var mysql = require("mysql");

var connection  = mysql.createConnection({
	supportBigNumbers : true,
	multipleStatements : true,

	host     : process.env.MYSQL_HOST || '127.0.0.1',
  user     : 'root',
  password : 'r00t',
	database : 'test-aonsolutions-org'
});

var options = {
    hostname: '127.0.0.1',
    port: 3000,
    method: 'POST',
    headers: {}
};

module.exports = {
	hostname : '127.0.0.1',
	port: 3000,
	db_connection: connection,
	post_options: options
}
