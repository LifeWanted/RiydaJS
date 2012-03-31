
function log( message ){
    console.log( (new Date()) + ': ' + message );
}

var Demo = {};
Demo.Client = (function(){
    function Client(){
        this._super();
    }
    util.inherit( Riyda.Client, Client );
    var ClientProto = Client.prototype;
    
    ClientProto.messageReceived = function( message ){
        log( message );
        this.send( 'Ping' );
    };
    
    ClientProto.start = function(){
        this.send( 'Ping' );
    };
    
    return Client;
})();

Demo.Server = (function(){
    function Server(){
        this._super();
    };
    util.inherit( Riyda.Server, Server );
    var ServerProto = Server.prototype;

    ServerProto.messageReceived = function( message ){
        log( message );
        this.send( message.originatorID, 'Pong' );
    }
    
    return Server;
})();

// Set up the application.
var app;
var client;
$(function(){
    app = new Riyda.Application();
    app.setServer( new Demo.Server() );
    app.init();
    client = new Demo.Client();
});

