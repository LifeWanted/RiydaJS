
// External variables
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

Combat.Message = (function(){
    function Message(){}
    Message._init = function( type ){
        util.assert( type );
        this._super();
        this._type = type;
    };
    var MessageProto = Message.prototype;

    Message.Type = {
        NextTurn : 'NextTurn'
    };

    MessageProto.getType = function(){
        return this._type;
    };

    return util.inherit( Riyda.Message, Message );
})();
