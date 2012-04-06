var Combat = Combat || {};

/// The actor class represents any entity that can perform actions.
Combat.Actor = (function(){
    function Actor(){
    }
    Actor._super = function(){
        this._super();
        this._status = {
            health  : 100,
            mana    : 100,
            stamina : 100
        };
    };
    util.inherit( Riyda.Actor, Actor );
    var ActorProto = Actor.prototype;

    /// Retrieves the health of the `Actor`.
    ///
    /// @return {number} The `Actor`'s health.
    ActorProto.getHealth = function(){
        return this._status.health;
    };

    /// Retrieves the mana of the `Actor`.
    ///
    /// @return {number} The `Actor`'s mana.
    ActorProto.getMana = function(){
        return this._status.mana;
    };

    /// Retrieves the stamina of the `Actor`.
    ///
    /// @return {number} The `Actor`'s stamina.
    ActorProto.getStamina = function(){
        return this._status.stamina;
    };

    return Actor;
})();
