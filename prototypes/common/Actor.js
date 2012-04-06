var Riyda = Riyda || {};

Riyda.Actor = (function(){
    function Actor(){
        this._id = util.generateID();
    }
    var ActorProto = Actor.prototype;

    ActorProto.getID = function(){
        return this._id;
    };

    return Actor;
})();
