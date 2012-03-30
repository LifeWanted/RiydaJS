
var Riyda = Riyda || {};

Riyda.Application = (function(){
    function Application(){
    }
    var ApplicationProto = Application.prototype;
    
    /// Initializes the application.
    ///
    /// This creates a new `Server` and sets up other things required for the
    /// `Application` framework to work.
    ApplicationProto.init = function(){
        this._server = new Riyda.Server();
    };

    /// Retrieves the `Application`'s `Server` instance.
    ApplicationProto.getServer = function(){
        return this._server;
    };

    return Application;
})();

