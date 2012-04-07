
// External variables.
var Riyda   = Riyda || {};
var util    = util  || null;

Riyda.Actor = (function(){
    function Actor(){
    }
    
    Actor._super = function( client ){
        util.assert.instance( client, Riyda.Client );
        this._client    = client;
        this._id        = util.generateID();
        this._actions   = {};
        Riyda.Application.getSingleton().addActor( this );
    };
    var ActorProto = Actor.prototype;

    /// Retrieves the ID of the `Actor`.
    ///
    /// @return {string} The `Actor`'s ID.
    ActorProto.getID = function(){
        return this._id;
    };

    /// Adds a new action to the `Actor`'s repitiore.
    ///
    /// @param {Riyda.Action} action The action to add.
    ActorProto.addAction = function( action ){
        util.assert( action instanceof Riyda.Action );
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
    /// @return {Riyda.Action} The named action.
    ActorProto.getAction = function( actionName ){
        util.assert( this._actions[actionName] instanceof Riyda.Action );
        return this._actions[actionName];
    };

    /// Performs the named action against the specified target.
    ///
    /// @param {string} actionName  The name of the action to perform.
    /// @param {string} targetID    The ID of the target of the action.
    ActorProto.perform = function( actionName, targetID ){
        var action = this.getAction( actionName );
        var target = Riyda.Application.getSingleton().getActor( targetID );
    };

    return Actor;
})();

