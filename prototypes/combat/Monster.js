
// External variables.
var Combat  = Combat    || {};
var util    = util      || null;

Combat.Monster = (function(){
    function Monster(){
    }
    Monster._init = function( client ){
        util.assert.instance( client, Combat.AIClient );
        this._super( client );
        this.addAction( Combat.Action.Bite );
    };

    return util.inherit( Combat.Actor, Monster );
})();
