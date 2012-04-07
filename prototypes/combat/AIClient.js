
// External variables.
var Combat  = Combat    || {};
var util    = util      || null;

Combat.AIClient = (function(){
    function AIClient(){
        this._monster = new Combat.Monster();
    }
    util.inherit( Combat.Client, AIClient );
    var AIClientProto = AIClient.prototype;

    AIClientProto.messageReceived = function( message ){
    };

    return AIClient;
})();
