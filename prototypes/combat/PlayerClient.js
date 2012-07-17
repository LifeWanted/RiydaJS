
// External variables.
var Combat  = Combat    || {};
var util    = util      || null;

Combat.PlayerClient = (function(){
    function PlayerClient(){
    }
    PlayerClient._init = function(){
        this._super();
        this._player = new Combat.Player( this );
    };
    var PlayerClientProto = PlayerClient.prototype;

    /// Fetches the player associated with this client.
    ///
    /// @return {Combat.Player} The player interface.
    PlayerClientProto.getPlayer = function(){
        return this._player;
    };

    PlayerClientProto.messageReceived = function( message ){
    };

    return util.inherit( Combat.Client, PlayerClient );
})();
