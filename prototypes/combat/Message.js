
// External variables
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

Combat.Message = (function(){
    function Message(){}
    
    /// @constructor
    ///
    /// @param {Message.Type} type The type of this message.
    Message._init = function( type ){
        util.assert( type );
        this._super();
        this._type = type;
    };
    var MessageProto = Message.prototype;

    Message.Type = util.makeEnum([
        'PerformAction',
        'ActionResolved',
        'ActorStatusUpdate'
    ]);

    MessageProto.getType = function(){
        return this._type;
    };

    return util.inherit( Riyda.Message, Message );
})();

/// The `PerformAction` message is sent from the `Client` to the `Server` and indicates 
Combat.Message.PerformAction = (function(){
    function PerformAction(){}

    /// @constructor
    ///
    /// @param {string}         actorID The ID of the actor to perform the action.
    /// @param {Combat.Action}  action  The action for the receiver to perform.
    PerformAction._init = function( actorID, action ){
        util.assert( actorID );
        util.assert.instance( action, Combat.Action );
        this._super( Combat.Message.Type.PerformAction );
        this._actorID   = actorID;
        this._action    = action;
    };
    var PerformActionProto = PerformAction.prototype;

    /// Retrieves the actor ID associated with this message.
    ///
    /// @return {string} The ID of the actor performing the action.
    util.accessor( PerformActionProto, 'getActorID', '_actorID' );

    /// Retrieves the action associated with this message.
    ///
    /// @return {Combat.Action} The action to be performed.
    util.accessor( PerformActionProto, 'getAction', '_action' );

    return util.inherit( Combat.Message, PerformAction );
})();

/// This message is a response to the `PerformAction` message.
///
/// It informes the originating client that their `Action` has been fully resolved. It does not
/// inform them of the results of the `Action`. That will come in a separate `ActorStatusUpdate`
/// message sent to all affected parties.
Combat.Message.ActionResolved = (function(){
    function ActionResolved(){}

    /// @constructor
    ///
    /// @param {string}         actorID The ID of the actor whose action was resolved.
    /// @param {Combat.Action}  action  The action that was resolved.
    ActionResolved._init = function( actorID, action ){
        this.assert( actorID );
        this.assert.instance( action, Combat.Action );
        this._super( Combat.Message.Type.ActionResolved );
        this._actorID   = actorID;
        this._action    = action;
    };
    var ActionResolvedProto = ActionResolved.prototype;

    /// Retrieves the actor ID associated with this message.
    ///
    /// @return {string} The ID of the actor performing the action.
    util.accessor( ActionResolvedProto, 'getActorID', '_actorID' );

    /// Retrieves the action associated with this message.
    ///
    /// @return {Combat.Action} The action to be performed.
    util.accessor( ActionResolvedProto, 'getAction', '_action' );

    return util.inherit( Combat.Message, ActionResolved );
})();
