
// External variables.
var Combat  = Combat    || {};
var Riyda   = Riyda     || null;
var util    = util      || null;

Combat.Action = (function(){
    function Action(){}

    /// @constructor
    ///
    /// @param {string} name The name of this `Action`.
    Action._init = function( name ){
        this._super( name );
    };
    var ActionProto = Action.prototype;

    ActionProto.setTargetID = function( targetID ){
        this._targetID = targetID;
    };

    return util.inherit( Riyda.Action, Action );
})();

Combat.Action.Bite = (function(){
    function Bite(){}

    /// @constructor
    Bite._init = function(){
        this._super( 'bite' );
    };

    return util.inherit( Combat.Action, Bite );
})();
