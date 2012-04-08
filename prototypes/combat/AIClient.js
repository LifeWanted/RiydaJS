
// External variables.
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

Combat.AIClient = (function(){
    function AIClient(){
    }
    AIClient._init = function(){
        this._monster   = new Combat.Monster( this );
        this._handlers  = {};
        this._handlers[Combat.Message.Type.NextTurn] = _nextTurn;
    };
    var AIClientProto = AIClient.prototype;

    /// Handles a new turn starting.
    function _nextTurn(){
        util.assert.instance( this, AIClient );
        
        // The AI just does a plain attack every turn.
        this._monster.attack( "bite" );
    }

    /// Handles new messages from the server.
    AIClientProto.messageReceived = function( message ){
        util.assert.instance( message, Combat.Message );
        util.assert.isFunction( this._handlers[ message.getType() ] );
        this._handlers[ message.getType() ].call( this, message );
    };

    return util.inherit( Combat.Client, AIClient );
})();
