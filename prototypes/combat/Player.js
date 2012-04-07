var Combat = Combat || {};

/// The `Player` class is the user's interface to the Combat Prototype.
Combat.Player = (function(){
    function Player(){
        this._super();
        this._targetID = null;
    }
    util.inherit( Combat.Actor, Player );
    var PlayerProto = Player.prototype;
    
    /// Prints the current status of the player.
    PlayerProto.status = function(){
        console.log(
            "HP: " + this.getHealth()   + "\n"  +
            "MP: " + this.getMana()     + "\n"  +
            "SP: " + this.getStamina()  + "\n"  +
            "\n"                                +
            this.ailments()
        );
    };
    
    /// Prints a list of attacks available to the player.
    PlayerProto.getAttacks = function(){
        console.log( this.getActionNames().join("\n") );
    };

    /// Performs the given `move` against the player's target.
    ///
    /// @param {string} move The name of the combat manuever to perform.
    PlayerProto.attack = function( move ){
        util.assert( this._targetID );
        this.perform( move, this._targetID );
    };

    /// Sets the player's target to the one given.
    ///
    /// @param {string} targetID The ID of the `Actor` to target.
    PlayerProto.setTarget = function( targetID ){
        this._targetID = targetID;
    };

    return Player;
})();
