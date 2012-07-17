
var connect = require("connect");

var server = connect()
    .use( connect['static']( __dirname + '/prototypes' ) );
server.listen( process.env.PORT || 8080, '0.0.0.0' );
