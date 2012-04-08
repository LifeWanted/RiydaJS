
// External variables.
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

Combat.Server = (function(){
    function Server(){
    }
    Server._init = function(){
        this._super();
    };
    var ServerProto = Server.prototype;

    ServerProto.messageReceived = function( message ){
    };

    return util.inherit( Riyda.Server, Server );
})();
