
var Riyda = Riyda || {};

Riyda.Application = (function(){
    var _instance = null;

    /// Constructor for `Application`
    /// @constructor
    ///
    /// @throws {Error} If an instance already exists.
    function Application(){
        util.assert( _instance == null );
        _instance = this;
        this._actors = {};
    }
    var ApplicationProto = Application.prototype;

    /// Retrieves the singleton instance of the `Application`.
    ///
    /// @throws {Error} If no instance exists yet.
    ///
    /// @return {Application} The singleton instance of the application.
    Application.getSingleton = function(){
        util.assert( _instance instanceof Application );
        return _instance;
    };

    /// Initializes the application.
    ///
    /// This performs checks to make sure it has everything required to run and
    /// also sets up other data.
    ApplicationProto.init = function(){
        util.assert( this._server instanceof Riyda.Server );
    };

    /// Sets the `Application`'s `Server` instance.
    ///
    /// @param {Riyda.Server}   server  The new `Server` to use.
    ApplicationProto.setServer = function( server ){
        util.assert( server instanceof Riyda.Server );
        this._server = server;
    };

    /// Retrieves the `Application`'s `Server` instance.
    ApplicationProto.getServer = function(){
        util.assert( this._server instanceof Riyda.Server );
        return this._server;
    };

    /// Adds an actor to the `Application`'s index.
    ///
    /// @param {Riyda.Actor} actor The `Actor` to add.
    ApplicationProto.addActor = function( actor ){
        util.assert( actor instanceof Riyda.Actor );
        this._actors[ actor.getID() ] = actor;
    };

    /// Retrieves the identified actor.
    ///
    /// @param {string} actorID The ID of the `Actor` to get.
    ///
    /// @return {Riyda.Actor} The `Actor` requested.
    ApplicationProto.getActor = function( actorID ){
        util.assert( this._actors[actorID] instanceof Riyda.Actor );
        return this._actors[actorID];
    };

    return Application;
})();
