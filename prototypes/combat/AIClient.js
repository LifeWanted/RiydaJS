
// External variables.
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

Combat.AIClient = (function(){
    function AIClient(){}
    AIClient._init = function(){
        this._super();
        this._monster   = new Combat.Monster( this );
        this._handlers  = {};
        this._handlers[Combat.Message.Type.ActionResolved]      = _message_actionResolved;
        this._handlers[Combat.Message.Type.ActorStatusUpdate]   = _message_actorStatusUpdate;
    };
    var AIClientProto = AIClient.prototype;

    /// Handles the resolution of an action.
    function _message_actionResolved(){
        util.assert.instance( this, AIClient );

        // The AI just does a plain attack every turn.
        this._monster.attack( 'bite' );
    }

    /// Handles updating the monster's status.
    function _message_actorStatusUpdate( message ){
        util.assert.instance( this, AIClient );
        util.assert.instance( message, Combat.Message.ActorStatusUpdate );

        // We only care about our actor.
        //
        // NOTE:    Real clients will need to update their internal status for _all_ actors. For
        //          this prototype both clients and the server are working on the same state listing
        //          for the actors.
        if( this._monster.getID() != message.getActorID() ){
            return;
        }
        
        // This is an update for our actor, so tell it to update its status.
        this._monster.updateStatus( message.getStatusUpdate() );
    }

    /// Handles new messages from the server.
    AIClientProto.messageReceived = function( message ){
        util.assert.instance( message, Combat.Message );
        util.assert.isFunction( this._handlers[ message.getType() ] );
        this._handlers[ message.getType() ].call( this, message );
    };

    return util.inherit( Combat.Client, AIClient );
})();
