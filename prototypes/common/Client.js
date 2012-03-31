
var Riyda = Riyda || {};

/// The `Client` class should be subclassed for each specific client task.
///
/// Do not forget to call `this._super.call( this )` in the subclass
/// constructor.
Riyda.Client = (function(){
    /// Client constructor.
    /// @constructor
    function Client(){
        this._connector = new Riyda.Connector();
        this._connector.onClientReceive( _receiveMessage.bind( this ) );
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

    return Client;
})();

