
var Riyda = Riyda || {};

/// The `Server` class should be subclassed 
Riyda.Server = (function(){
    /// Server constructor.
    /// @constructor
    function Server(){
        this._connections = {};
    }
    var ServerProto = Server.prototype;

    /// Handles receiving messges from the `Server`.
    ///
    /// @param {*}  message The message that came in.
    function _receiveMessage( message ){
        util.assert( this instanceof Server );
        this.messageReceived( message );
    }

    ServerProto.connect = function( connector ){
        util.assert( connector instanceof Riyda.Connector );
        this._connections[ connector.getID() ] = connector;
        connector.onReceive( _receiveMessage.bind( this ) );
    };

    /// Abstract method for handling new messages.
    ///
    /// @param {*}  message The message received.
    ServerProto.messageReceived = util.abstract( 'Server.messageReceived' );

    return Server;
})();

