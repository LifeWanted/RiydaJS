
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
    
    ConnectorProto.connect = function(){
        Riyda.Application.getSingleton().getServer().connect( this );
    };

    ConnectorProto.send = function( message ){
        message.originatorID = this.getID();
        var latency = this._latency;
        var self = this;
        setTimeout( function(){
            util.assert( self._messageReceiver instanceof Function );
            self._messageReceiver( message );
        }, latency );
    };
    
    ConnectorProto.onReceive = function( receiver ){
        this._messageReceiver = receiver;
    };
    
    return Connector;
})();

