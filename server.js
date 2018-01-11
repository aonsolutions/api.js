'use strict'

var config = undefined;
const args = require('minimist')(process.argv.slice(2), {
        alias: {
                c: 'config',
                h: 'help'
        },
        default: {
                config : "./configuration"
        },
});

if(args.h){
        console.log("Usage: test.js [OPTION]");
        console.log("");
        console.log("Option       GNU Long Option       Meaning");
        console.log("");
        console.log("-c <dir>     --config=<dir>        Configuration file, <dir> = String whith complete path without file extension");
        console.log("");
}else{

  const http = require('http');
  var querystring = require('querystring');
  var aon = require("aon");
  console.log(args.c);
  config = require(args.c);

  /**
   ESTE FRAGMENTO ES PARA DESCARGAR UN AGREEMENT -> URL = ../1156

   ESTE FRAGMENTO ES PARA GUARDAR UN AGREEMENT -> curl -d archivo.json servidor // client.js
  */

  var connection = config.db_connection;
  var port = config.port;
  var hostname = config.hostname;
  console.log(connection);

  const server = http.createServer((req, res) => {
    if (req.method == 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      var path = req.url.split('/');
      //res.end(req.url);
      aon.agreementGet.get(connection,
        path[1],
        function(connection, agreement){
          res.end(JSON.stringify(agreement))
        }
      );
    }

    if (req.method == 'POST') {
      var body = '';
      req.on('data', function (data) {
         body += data;
       });

       req.on('end', function () {
           aon.agreementSave.setAgreement(
              JSON.parse(body),
              function (sql, next) {
                connection.query({
                  sql: sql.text,
                  values: sql.values
                },
                function(error, results, fields) {
                  console.log(sql);
                  if ( error )
                    throw error;
                  next();
                });
              }
            );

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World\n');
        });
    }

  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}
