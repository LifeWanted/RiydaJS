var Combat = Combat || {};

Combat.Monster = (function(){
    function Monster(){
        this._super();
    }
    util.inherit( Combat.Actor, Monster );
    
    
    
    return Monster;
})();
