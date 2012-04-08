
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
        obj + ' is not an instance of ' + util.getFunctionName( clas )
    );
};

/// Asserts that `func` is a function.
///
/// @throws {Error} If `func` is not a function.
///
/// @param {*} func The object to test.
util.assert.isFunction = function( func ){
    util.assert( util.isFunction( func ), func + ' is not a function' );
};

/// Copies the direct properties of `src` to `dest`.
///
/// @param {Object}     src     The object to copy from.
/// @param {Object?}    dest    The object to copy to. Default is a new object.
///
/// @return {Object} The destination object.
util.copy = function( src, dest ){
    dest = dest || {};
    for( var i in src ){
        if( src.hasOwnProperty( i ) ){
            dest[i] = src[i];
        }
    }
    return dest;
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
    return func.toString().match( /^function (\w*)/ )[1] || "<anonymous>";
};

/// Sets up `derived` to inherit from `base`.
///
/// @param {function}   base    The base class constructor.
/// @param {function}   derived The derived class constructor.
///
/// @return {function} The new class that inherits from `base` and `derived`.
util.inherit = function( base, derived ){
    // Prepare our prototypes.
    var supr  = base.prototype;
    var derv  = derived.prototype;
    base.__initializing__ = true;
    var proto = new base();
    base.__initializing__ = false;

    // A utility function to handle setting the super function.
    var superCaller = function( name ){
        return function(){
            var oldSuper    = this._super;
            this._super     = supr[name];
            var result      = derv[name].apply( this, arguments );
            this._super     = oldSuper;
            return result;
        };
    };

    // Any overridden functions get a special wrapper.
    for( var name in derv ){
        if( util.isFunction( derv[name], supr[name] ) ){
            proto[name] = superCaller( name );
        }
        else {
            proto[name] = derv[name];
        }
    }

    // Finally set the derived class' prototype.
    proto.constructor   = derived;
    derived.prototype   = proto;

    var clas = function(){
        if( !clas.__initializing__ ){
            var oldSuper    = this._super;
            this._super     = base;
            derived._init.apply( this, arguments );
            this._super     = oldSuper;
        }
    };
    derived.__initializing__ = true;
    clas.prototype  = new derived();
    derived.__initializing__ = false;
    util.copy( derived, clas );
    return clas;
};

/// Turns the provided `base` class into an inheritable clas compatible with `util.inherit`.
///
/// @param {function} base The constructor for the base class.
///
/// @return {function} The new class that is compatible with `util.inherit`.
util.inherit.base = function( base ){
    var clas = function(){
        if( !clas.__initializing__ ){
            base._init.apply( this, arguments );
        }
    };
    base.__initializing__ = true;
    clas.prototype  = new base();
    base.__initializing__ = false;
    util.copy( base, clas );
    return clas;
};

/// Detects if all of the parameters are functions.
///
/// @return {boolean} True if every parameter is a function.
util.isFunction = function(){
    for( var i in arguments ){
        if( !(arguments[i] instanceof Function) ){
            return false;
        }
    }
    return true;
};
