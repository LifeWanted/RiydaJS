
// External variables.
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

/// The `Combat.Server` resolves actions taken by its clients in a turn-based fashion.
Combat.Server = (function(){
    function Server(){}
    var DefaultTurnDuration = 10 * 1000; // 10 seconds in milliseconds.

    /// @constructor
    Server._init = function(){
        this._super();
        this._turnDuration  = DefaultTurnDuration;
        this._turnActions   = {};
        this._handlers      = {};
        this._handlers[Combat.Message.PerformAction] = _message_performAction;
        _triggerNextTurn.call( this );
    };
    var ServerProto = Server.prototype;

    /// Sets a timeout to resolve the next turn.
    function _triggerNextTurn(){
        util.assert.instance( this, Server );
        this._turnTimeout = setTimeout( _resolveTurn.bind( this ), this._turnDuration );
    }

    /// Resolves all queued actions for the turn.
    ///
    /// The status changes from each action are applied _after_ all actions have been resolved. This
    /// prevents inner-turn timing from affecting the results.
    function _resolveTurn(){
        throw new Error( 'Stub' );
        _triggerNextTurn.call( this );
    }

    function _message_performAction( message ){
        util.assert.instance( message, Combat.Message.PerformAction );
        this._turnActions[message.getActorID()] = message.getAction();
    }

    /// Handles new messages coming in.
    ServerProto.messageReceived = function( message ){
        util.assert.instance( message, Combat.Message );
        util.assert(
            this._handlers[message.getType()],
            'No handler for message ' + message.getType()
        );
        this._handlers[message.getType()].call( this, message );
    };

    /// Sets the duration of the next and future turns.
    ///
    /// @param {number} duration The duration to set in milliseconds.
    ServerProto.setTurnDuration = function( duration ){
        util.assert.isNumber( duration );
        this._turnDuration = duration;
    };

    return util.inherit( Riyda.Server, Server );
})();
