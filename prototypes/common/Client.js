
// External variables.
var Riyda   = Riyda || {};
var util    = util  || null;

/// The `Client` class should be subclassed for each specific client task.
///
/// Do not forget to call `this._super()` in the subclass constructor.
Riyda.Client = (function(){
    /// Client class.
    function Client(){
    }
    
    /// Client constructor.
    /// @constructor
    ///
    /// Be sure the `Applicaiton` is constructed and initialized before creating
    /// the `Client`.
    Client._init = function(){
        util.assert( this instanceof Client );
        this._id = util.generateID();
        this._connector = new Riyda.Connector( this._id );
        this._connector.onClientReceive( _receiveMessage.bind( this ) );
        this._connector.connect();
    };
    var ClientProto = Client.prototype;

    /// Handles receiving messges from the `Server`.
    ///
    /// @param {*}  message The message that came in.
    function _receiveMessage( message ){
        util.assert( this instanceof Client );
        this.messageReceived( message );
    }

    /// Abstract method for handling new messages.
    ///
    /// @param {*}  message The message received.
    ClientProto.messageReceived = util.abstract( 'Client.messageReceived' );

    /// Sends a message to the `Server`.
    ///
    /// @param {*}  message The message to send.
    ClientProto.send = function( message ){
        message.originatorID = this._id;
        this._connector.sendToServer( message );
    };
    
    /// Fetches the `Client`'s connection to the `Server`.
    ///
    /// @return {Riyda.Connector} The connector.
    ClientProto.getConnector = function(){
        return this._connector;
    };

    return util.inherit.base( Client );
})();

