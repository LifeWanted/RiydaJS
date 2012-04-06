var Combat = Combat || {};

Combat.Client = (function(){
    function Client(){
        this._super();
        this._player = new Combat.Player();
    }
    util.inherit( Riyda.Client, Client );
    var ClientProto = Client.prototype;
    
    ClientProto.messageReceived = function( message ){
    };

    ClientProto.start = function(){
    };
    
    ClientProto.help = function(){
        console.log(
            "This is a prototype of the Riyda combat system. As the "   +
            "player you perform all your actions through the global "   +
            "`me` object. This object has the following controls:\n"    +
            "  me.status()          : \n"   +
            "  me.getAttacks()      : \n"   +
            "  me.attack( move )    : \n"   +
            "\n"
        );
    };

    return Client;
})();