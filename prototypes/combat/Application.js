
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
    
    ApplicationProto.init = function(){
        Riyda.Application.prototype.init.call( this );
        
        this._playerClient  = new Combat.PlayerClient();
        this._aiClient      = new Combat.AIClient();
    };
    
    return Application;
})();
