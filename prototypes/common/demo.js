var app;
var client;

var Demo = {};
Demo.Client = (function(){
    function Client(){
        this._super();
    }
    util.inherit( Riyda.Client, Client );
    var ClientProto = Client.prototype;
    
    ClientProto.messageReceived = function( message ){
    };
    
    ClientProto.start = function(){
    };
    
    return Client;
})();

$(function(){
    app = new Riyda.Application();
    app.init();
    client = new Demo.Client();
};

