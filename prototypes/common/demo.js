
// External variables.
var Riyda   = Riyda || null;
var util    = util  || null;

function log( message ){
    console.log( (new Date()) + ': ' + message.message );
}

var Demo = {};
Demo.Client = (function(){
    function Client(){
    }
    Client._init = function(){
        this._super();
        this.getConnector().setLatency( 500 );
    };
    var ClientProto = Client.prototype;
    
    ClientProto.messageReceived = function( message ){
        log( message );
        if( !this._stop ){
            this.send( { 'message' : 'Ping' } );
        }
    };
    
    ClientProto.start = function(){
        this.send( { 'message' : 'Ping' } );
    };
    
    ClientProto.stop = function(){
        this._stop = true;
    };
    
    return util.inherit( Riyda.Client, Client );
})();

Demo.Server = (function(){
    function Server(){
    }
    Server._init = function(){
        this._super();
    };
    var ServerProto = Server.prototype;

    ServerProto.messageReceived = function( message ){
        log( message );
        this.send( message.originatorID, { 'message' : 'Pong' } );
    };
    
    return util.inherit( Riyda.Server, Server );
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

