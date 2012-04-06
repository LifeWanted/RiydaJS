var Combat = Combat || {};

Combat.Server = (function(){
    function Server(){
        this._super();
    }
    util.inherit( Riyda.Server, Server );
    var ServerProto = Server.prototype;

    ServerProto.messageReceived = function( message ){
    };

    return Server;
})();
