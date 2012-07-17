
// External variables.
var Riyda   = Riyda || {};
var util    = util  || null;

/// An asynchronous network connection simulator.
///
/// This class sends and receives messages with a delay that emulates network
/// latency.
Riyda.Connector = (function(){
    /// Connector constructor.
    /// @constructor
    ///
    /// @param {string}     id          The ID of the owning entity.
    /// @param {number?}    latency     The minimum simulated latency in ms.
    /// @param {number?}    variation   The percentage variation in the latency.
    function Connector( id, latency, variation ){
        util.assert( id );
        this._id = id;
        this._latency = latency || 50;
        this._latencyVariation = variation || 0.25;
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
    ConnectorProto.sendToServer = function( message ){
        _send.call( this, message, this._serverReceiver );
    };
    
    /// Sends a message to the `Connector`'s `Client`.
    ///
    /// @param {*} message The message to send.
    ConnectorProto.sendToClient = function( message ){
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
    
    /// Returns the ID of the owning entity.
    ///
    /// @return {string} The ID.
    ConnectorProto.getID = function(){
        return this._id;
    };
    
    /// Sets new values for the latency and latency variation.
    ///
    /// @param {number?}    latency     The desired minimum latency in ms.
    /// @param {number?}    varation    The percentage varation in latency.
    ConnectorProto.setLatency = function( latency, variation ){
        util.assert( !isNaN( latency ) || !isNaN( variation ) );
        if( !isNaN( latency ) ){
            this._latency = latency;
        }
        if( !isNaN( variation ) ){
            this._latencyVariation = variation;
        }
    };
    
    return Connector;
})();

