
// External variables.
var Riyda   = Riyda || {};
var util    = util  || null;

Riyda.Action = (function(){
    function Action(){}
    
    /// @constructor
    ///
    /// @param {string} name The name of this action.
    Action._init = function( name ){
        util.assert.isString( name );
        this._name = name;
    };
    var ActionProto = Action.prototype;

    /// Retrieves the name of this `Action`.
    ///
    /// @return {string} The name of this `Action`.
    util.accessor( ActionProto, 'getName', '_name' );

    return util.inherit.base( Action );
})();
