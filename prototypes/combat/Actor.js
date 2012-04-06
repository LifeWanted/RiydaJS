var Combat = Combat || {};

/// The actor class represents any entity that can perform actions.
Combat.Actor = (function(){
    function Actor(){
    }
    Actor._super = function(){
        this._super();
        this._status = {
            health  : 100,
            mana    : 100,
            stamina : 100
        };
        this._actions = {};
    };
    util.inherit( Riyda.Actor, Actor );
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

    /// Adds a new action to the `Actor`'s repitiore.
    ///
    /// @param {Combat.Action} action The action to add.
    ActorProto.addAction = function( action ){
        util.assert( action instanceof Combat.Action );
        this._actions[ action.getName() ] = action;
    };

    /// Fetches the names of all the actions available to this `Actor`.
    ///
    /// @return {Array.<string>} An array of action names.
    ActorProto.getActionNames = function(){
        return util.getKeys( this._actions );
    };

    /// Retrieves the named action from the `Actor`'s action list.
    ///
    /// @param {string} actionName The name of the action to retrieve.
    ///
    /// @return {Combat.Action} The named action.
    ActorProto.getAction = function( actionName ){
        util.assert( this._actions[actionName] instanceof Combat.Action );
        return this._actions[actionName];
    };

    /// Performs the named action against the specified target.
    ///
    /// @param {string} actionName  The name of the action to perform.
    /// @param {number} targetID    The ID of the target of the action.
    ActorProto.perform = function( actionName, targetID ){
        var action = this.getAction( actionName );
        var target = Riyda.Application.getSingleton().getActor( targetID );
    };

    return Actor;
})();
