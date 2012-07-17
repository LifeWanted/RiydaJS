
// External variables.
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

Combat.Client = (function(){
    function Client(){
    }
    Client._init = function(){
        util.assert( this._super !== Client._init );
        this._super();
    };
    var ClientProto = Client.prototype;

    return util.inherit( Riyda.Client, Client );
})();
