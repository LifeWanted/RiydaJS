var Combat = Combat || {};

Combat.Monster = (function(){
    function Monster( client ){
        this._super( client );
    }
    util.inherit( Combat.Actor, Monster );

    return Monster;
})();
