
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

    return Application;
})();

