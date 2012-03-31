
var Riyda = Riyda || {};

/// An asynchronous network connection simulator.
///
/// This class sends and receives messages with a delay that emulates network
/// latency.
Riyda.Connector = (function(){
    function Connector(){
        this._latency = 50;
        this._latencyVariation = 0.25;
    }
    var ConnectorProto = Connector.prototype;

    /// Sends a message to the given receiver after a random delay.
    ///
    /// @param {*}          message     The message to send.
    /// @param {function}   receiver    The function to receive the message.
    function _send( message, receiver ){
        util.assert( this instanceof Connector );
        var latency = this._latency;
        latency += Math.random() * this._latencyVariation * latency;
        setTimeout( function(){
            util.assert( receiver instanceof Function );
            receiver( message );
        }, latency );
    }
    
    /// Connect this `Connector` to the `Server`.
    ConnectorProto.connect = function(){
        Riyda.Application.getSingleton().getServer().connect( this );
    };

    /// Sends a message to the `Server`.
    ///
    /// @param {*} message The message to send.
    ConnectorProto.toServer = function( message ){
        _send.call( this, message, this._serverReceiver );
    };
    
    /// Sends a message to the `Connector`'s `Client`.
    ///
    /// @param {*} message The message to send.
    ConnectorProto.toClient = function( message ){
        _send.call( this, message, this._clientReceiver );
    };
    
    /// Sets the `Server` message receiver function.
    ///
    /// @param {function} receiver  The function that will receive messages for
    ///                             the server.
    ConnectorProto.onServerReceive = function( receiver ){
        util.assert( receiver instanceof Function );
        this._serverReceiver = receiver;
    };
    
    /// Sets the `Client` message receiver function.
    ///
    /// @param {function} receiver  The function that will receive messages for
    ///                             the client.
    ConnectorProto.onClientReceive = function( receiver ){
        util.assert( receiver instanceof Function );
        this._clientReceiver = receiver;
    };
    
    return Connector;
})();

