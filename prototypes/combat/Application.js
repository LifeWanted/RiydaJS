
// External variables.
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

Combat.Application = (function(){
    function Application(){
        this.setServer( new Combat.Server() );
    }
    util.instance( Riyda.Application, Application );
    var ApplicationProto = Application.prototype;
    
    /// Initializes the application.
    ApplicationProto.init = function(){
        // Call the base initialization.
        Riyda.Application.prototype.init.call( this );

        // Create our clients.
        this._playerClient  = new Combat.PlayerClient();
        this._aiClient      = new Combat.AIClient();
    };
    
    /// Gets the player's interface instance.
    ///
    /// @return {Combat.Player} The player's interface.
    ApplicationProto.getPlayer = function(){
        util.assert( this._playerClient instanceof Combat.PlayerClient );
        return this._playerClient.getPlayer();
    };
    
    return Application;
})();
