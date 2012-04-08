
// External variables.
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

/// The actor class represents any entity that can perform actions.
Combat.Actor = (function(){
    function Actor(){
    }

    /// Actor super constructor.
    /// @constructor
    ///
    /// @param {Combat.Client} client The controlling client.
    Actor._init = function( client ){
        this._super( client );
        this._targetID = null;
        this._status = {
            health  : 100,
            mana    : 100,
            stamina : 100
        };
    };
    var ActorProto = Actor.prototype;

    /// Retrieves the health of the `Actor`.
    ///
    /// @return {number} The `Actor`'s health.
    ActorProto.getHealth = function(){
        return this._status.health;
    };

    /// Retrieves the mana of the `Actor`.
    ///
    /// @return {number} The `Actor`'s mana.
    ActorProto.getMana = function(){
        return this._status.mana;
    };

    /// Retrieves the stamina of the `Actor`.
    ///
    /// @return {number} The `Actor`'s stamina.
    ActorProto.getStamina = function(){
        return this._status.stamina;
    };

    /// Sets the player's target to the one given.
    ///
    /// @param {string} targetID The ID of the `Actor` to target.
    ActorProto.setTarget = function( targetID ){
        this._targetID = targetID;
    };

    /// Performs the given `move` against the player's target.
    ///
    /// @param {string} move The name of the combat manuever to perform.
    ActorProto.attack = function( move ){
        util.assert( this._targetID );
        this.perform( move, this._targetID );
    };

    /// Performs the named action against the specified target.
    ///
    /// @param {string} actionName  The name of the action to perform.
    /// @param {string} targetID    The ID of the target of the action.
    ActorProto.perform = function( actionName, targetID ){
        var action = this.getAction( actionName );
        var target = Riyda.Application.getSingleton().getActor( targetID );
    };

    return util.inherit( Riyda.Actor, Actor );
})();
