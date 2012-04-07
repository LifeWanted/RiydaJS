
var util = {};

/// Creates an abstract function.
///
/// @throws {Error} If called. Abstract methods should not be called.
///
/// @param {string} methodName  The name of the abstract method.
util.abstract = function( methodName ){
    return function(){
        throw new Error( 'Abstract method "' + methodName + '" called.' );
    };
};

/// Asserts that the given value is true.
///
/// @throws {Error} If `val` is not true.
///
/// @param {boolean}    val     The value to assert for truth.
/// @param {string?}    message An optional message to put in the error.
util.assert = function( val, message ){
    if( !val ){
        var error = 'Assertion failure' + (message ? ': ' + message : '') + '.';
        throw new Error( error );
    }
};

/// Asserts that `obj` is an instance of the class `clas`.
///
/// @throws {Error} If `obj` is not an instance of `clas`.
///
/// @param {*}          obj     The object to test.
/// @param {function}   clas    The class to test for.
util.assert.instance = function( obj, clas ){
    util.assert(
        obj instanceof clas,
        'Not an instance of ' + util.getFunctionName( clas )
    );
};

/// Asserts that `func` is a function.
///
/// @throws {Error} If `func` is not a function.
///
/// @param {*} func The object to test.
util.assert.isFunction = function( func ){
    util.assert( func instanceof Function, 'Not a function' );
};

/// Generates a new random ID.
///
/// @return {string} The new ID string.
util.generateID = function(){
    var id = Math.ceil( Math.random() * 0xffff ) *
             Math.ceil( Math.random() * 0xffff );
    return '_id:' + id;
};

/// Retrieves the name of the provided function.
///
/// @param {function} func The function to get the name of.
///
/// @return {string} The name of the provided function.
util.getFunctionName = function( func ){
    util.assert.isFunction( func );
    return func.toString().match( /^function (\w+)/ )[1];
};

/// Sets up `derived` to inherit from `base`.
///
/// @param {function}   base    The base class constructor.
/// @param {function}   derived The derived class constructor.
util.inherit = function( base, derived ){
    derived.prototype = new base();
    derived.prototype.constructor = derived;
    derived.prototype._super = function(){
        if( base._super instanceof Function ){
            base._super.apply( this, arguments );
        }
        else {
            base.apply( this, arguments );
        }
    };
};

