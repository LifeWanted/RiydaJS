
var connect = require("connect");

var server = connect()
    .use( connect['static']( __dirname + '/prototypes' ) );
server.listen( process.env.PORT || 80, '0.0.0.0' );
