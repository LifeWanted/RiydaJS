
// External variables.
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

Combat.Client = (function(){
    function Client(){
        this._super();
        this._player = new Combat.Player();
    }
    util.inherit( Riyda.Client, Client );
    var ClientProto = Client.prototype;
    
    ClientProto.messageReceived = function( message ){
    };

    return Client;
})();
