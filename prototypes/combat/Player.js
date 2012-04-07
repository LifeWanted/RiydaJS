
// External variables.
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

/// The `Player` class is the user's interface to the Combat Prototype.
Combat.Player = (function(){
    function Player( client ){
        util.assert.instance( client, Combat.PlayerClient );
        this._super();
        this._client   = client;
        this._targetID = null;
    }
    util.inherit( Combat.Actor, Player );
    var PlayerProto = Player.prototype;

    /// Gets the targetand engages it in combat.
    PlayerProto.start = function(){
        var monster = Riyda.Application.getSingleton().getMonster();
        this.setTarget( monster.getID() );
        console.log("Make an attack to begin combat.");
    };

    /// Prints help information.
    PlayerProto.help = function(){
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

    /// Prints the status effects active on the player.
    PlayerProto.ailments = function(){
    };

    /// Prints the current status of the player.
    PlayerProto.status = function(){
        console.log(
            "HP: " + this.getHealth()   + "\n"  +
            "MP: " + this.getMana()     + "\n"  +
            "SP: " + this.getStamina()  + "\n"  +
            "\n"
        );
        this.ailments();
    };

    /// Prints a list of attacks available to the player.
    PlayerProto.getAttacks = function(){
        console.log( this.getActionNames().join("\n") );
    };

    /// Sets the player's target to the one given.
    ///
    /// @param {string} targetID The ID of the `Actor` to target.
    PlayerProto.setTarget = function( targetID ){
        this._targetID = targetID;
    };

    return Player;
})();
