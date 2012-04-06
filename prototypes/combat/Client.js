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
            "This is a prototype of the Riyda combat system. As the player you perform all "    +
            "your actions through the global `me` object. This object has the following "       +
            "controls:\n"                                                                       +
            "  me.ailments()        : Lists the active status effects.\n"                       +
            "  me.status()          : Lists the player's health and status effects.\n"          +
            "  me.getAttacks()      : Lists the moves the player can use to attack.\n"          +
            "  me.attack( move )    : Performs the named attack.\n"   +
            "\n"
        );
    };

    return Client;
})();