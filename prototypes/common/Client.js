
var Riyda = Riyda || {};

/// The `Client` class should be subclassed for each specific client task.
///
/// Do not forget to call `this._super.call( this )` in the subclass
/// constructor.
Riyda.Client = (function(){
    /// Client constructor.
    /// @constructor
    ///
    /// Be sure that the `Application` is built and initialized before
    /// constructing the `Client`.
    function Client(){
        this._connector = new Riyda.Connector();
        this._connector.onClientReceive( _receiveMessage.bind( this ) );
        this._connector.connect();
        this._id = util.generateID();
    }
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

    ClientProto.send = function( message ){
        message.originatorID = this._id;
        this._connector.sendToServer( message );
    };

    return Client;
})();

