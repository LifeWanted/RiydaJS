
// External variables.
var Riyda   = Riyda || {};
var util    = util  || null;

Riyda.Message = (function(){
    function Message(){
    }
    var MessageProto = Message.prototype;

    /// Abstract method for getting the type of a message.
    MessageProto.getType = util.abstract( "Message.getType" );

    return util.inherit.base( Message );
})();
