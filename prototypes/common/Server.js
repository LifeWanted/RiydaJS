
var Riyda = Riyda || {};

Riyda.Server = (function(){
    function Server(){
        this._connections = {};
    }
    var ServerProto = Server.prototype;

    function _receiveMessage( message ){
        util.assert( this instanceof Server );
    }

    ServerProto.connect = function( connector ){
        util.assert( connector instanceof Riyda.Connector );
        this._connections[ connector.getID() ] = connector;
        connector.onReceive( _receiveMessage.bind( this ) );
    };

    return Server;
})();

