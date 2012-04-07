
// External variables.
var Combat  = Combat    || {};
var util    = util      || null;

Combat.PlayerClient = (function(){
    function PlayerClient(){
        this._player = new Combat.Player();
    }
    util.inherit( Combat.Client, PlayerClient );
    var PlayerClientProto = PlayerClient.prototype;

    /// Fetches the player associated with this client.
    ///
    /// @return {Combat.Player} The player interface.
    PlayerClientProto.getPlayer = function(){
        return this._player;
    };

    return PlayerClient;
})();
