
// External variables.
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

Combat.Client = (function(){
    function Client(){
        this._super();
    }
    util.inherit( Riyda.Client, Client );
    var ClientProto = Client.prototype;

    return Client;
})();
