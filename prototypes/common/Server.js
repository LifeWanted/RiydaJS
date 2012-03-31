
var Riyda = Riyda || {};

/// The `Server` class should be subclassed 
Riyda.Server = (function(){
    /// Server constructor.
    /// @constructor
    function Server(){
        this._connections = {};
        this._id = util.generateID();
    }
    var ServerProto = Server.prototype;

    /// Handles receiving messges from the `Server`.
    ///
    /// @param {*}  message The message that came in.
    function _receiveMessage( message ){
        util.assert( this instanceof Server );
        this.messageReceived( message );
    }

    /// Adds the given `Connector` to the `Server`'s connection pool.
    ///
    /// @param {Riyda.Connector}    connector   The connector to add.
    ServerProto.connect = function( connector ){
        util.assert( connector instanceof Riyda.Connector );
        this._connections[ connector.getID() ] = connector;
        connector.onReceive( _receiveMessage.bind( this ) );
    };

    /// Abstract method for handling new messages.
    ///
    /// @param {*}  message The message received.
    ServerProto.messageReceived = util.abstract( 'Server.messageReceived' );

    /// Sends a message to a single `Client` of the `Server`.
    ///
    /// @param {string} clientID    The ID of the client to send to.
    /// @param {*}      message     The message to send.
    ServerProto.send( clientID, message ){
        util.assert( this._connections[ clientID ] instanceof Riyda.Connector );
        message.originatorID = this._id;
        this._connections[ clientID ].sendToClient( message );
    };
    
    /// Sends the message to all `Client`s connected to the `Server`.
    ///
    /// @param {*}  message The message to send.
    ServerProto.sendToAll( message ){
        for( var id in this._connections ){
            this.send( id, message );
        }
    };

    return Server;
})();

