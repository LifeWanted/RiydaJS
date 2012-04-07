
// External variables.
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

Combat.Application = (function(){
    function Application(){
        this._super();
        this.setServer( new Combat.Server() );
    }
    util.inherit( Riyda.Application, Application );
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
        util.assert.instance( this._playerClient, Combat.PlayerClient );
        return this._playerClient.getPlayer();
    };

    /// Gets the AI monster actor.
    ///
    /// @return {Combat.Monster} The monster actor.
    ApplicationProto.getMonster = function(){
        util.assert.instance( this._aiClient, Combat.AIClient );
        return this._aiClient.getMonster();
    };

    return Application;
})();
