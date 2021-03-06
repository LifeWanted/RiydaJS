
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

/// Creates an accessor method.
///
/// @param {Object} proto   The prototype to add the accessor method to.
/// @param {string} method  The name of the accessor method.
/// @param {string} member  The name of the member to access.
util.accessor = function( proto, method, member ){
    proto[method] = function(){
        return this[member];
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

/// Asserts that `constr` is a constructor for the class `clas` or any subclass of `clas`.
///
/// @throws {Error} If `constr` is not a constructor for `clas`.
///
/// @param {*}          constr  The constructor to test.
/// @param {function}   clas    The class to check for.
util.assert.builds = function( constr, clas ){
    util.assert(
        constr.prototype instanceof clas,
        constr + ' is not a constructor for ' + util.getFunctionName( clas )
    );
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

/// Asserts that `arr` is an array.
///
/// @throws {Error} If `arr` is not an array.
///
/// @param {*} arr The object to test.
util.assert.isArray = function( arr ){
    util.assert( util.isArray( arr ), arr + ' is not an array' );
};

/// Asserts that `func` is a function.
///
/// @throws {Error} If `func` is not a function.
///
/// @param {*} func The object to test.
util.assert.isFunction = function( func ){
    util.assert( util.isFunction( func ), func + ' is not a function' );
};

util.assert.isNumber = function( num ){
    util.assert( util.isNumber( num ), num + ' is not a number' );
};

util.assert.isNumeric = function( num ){
    util.assert( util.isNumeric( num ), num + ' is not numeric' );
};

/// Asserts that `str` is a string.
///
/// @throws {Error} If `str` is not a string.
///
/// @param {*} str The object to test.
util.assert.isString = function( str ){
    util.assert( util.isString( str ), str + ' is not a string' );
};

/// Concatenates the contents of `elems` to the end of `target`.
///
/// @param {array} target   The array to add the elements to.
/// @param {array} elems    An array of elements to add.
util.concat = function( target, elems ){
    util.assert.isArray( target );
    util.assert.isArray( elems );
    Array.prototype.push.apply( target, elems );
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

/// Retrieves all the keys of the object `obj`.
///
/// @param {Object.<string,*>} obj The object to retrieve the keys of.
///
/// @return {Array.<string>} An array containing all the keys read from the object.
util.getKeys = function( obj ){
    var keys = [];
    for( var i in obj ){
        if( obj.hasOwnProperty( i ) ){
            keys.push( i );
        }
    }
    return keys;
};

/// Sets up `derived` to inherit from `base`.
///
/// @param {function}   base    The base class constructor.
/// @param {function}   derived The derived class constructor.
///
/// @return {function} The new class that inherits from `base` and `derived`.
util.inherit = function( base, derived ){
    util.assert.isFunction( base );
    util.assert.isFunction( derived );
    
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
    var callsSuper = /\b_super\b/;

    // Any overridden functions get a special wrapper.
    for( var name in derv ){
        var dervFunc = derv[name];
        if( util.isFunction( dervFunc, supr[name] ) && callsSuper.test( dervFunc ) ){
            proto[name] = superCaller( name );
        }
        else {
            proto[name] = dervFunc;
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
    util.assert.isFunction( base );
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

/// Detects if all the parameters are arrays.
///
/// @areturn {boolean} True if every parameter is an array.
util.isArray = function(){
    for( var i in arguments ){
        if( !(arguments[i] instanceof Array) ){
            return false;
        }
    }
    return true;
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

/// Detects if all of the parameters are numbers.
///
/// Note that this is only true for numbers. If you simply want to know if an object can be
/// converted to a number use `util.isNumeric` instead.
///
/// @return {boolean} True if every parameter is a number.
util.isNumber = function(){
    for( var i in arguments ){
        if( !(arguments[i] instanceof Number) ){
            return false;
        }
    }
    return true;
};

/// Detects if all of the parameters are numeric.
///
/// Note that this only detects if an object can be accurately converted to a number. If you need to
/// know if an object actually is a number use `util.isNumber` instead.
///
/// @return {boolean} True if every parameter is a number.
util.isNumeric = function(){
    for( var i in arguments ){
        if( isNaN( arguments[i] ) ){
            return false;
        }
    }
    return true;
};

/// Detects if all of the parameters are strings.
///
/// @return {boolean} True if every parameter is a string.
util.isString = function(){
    for( var i in arguments ){
        if( !(arguments[i] instanceof String) ){
            return false;
        }
    }
    return true;
};

/// Creates an enumeration object from the given values.
///
/// @param {Array.<string>} names An array of the enumeration names.
///
/// @return {Object.<string,string>} An enumeration object.
util.makeEnum = function( names ){
    util.assert.isArray( names );
    var enm = {};
    for( var i = 0; i < names.length; ++i ){
        enm[names[i]] = names[i];
    }
    return enm;
};

/// Creates a mapping of names to bit flags.
///
/// @param {Array.<stirng>} names An array of flag names.
///
/// @return {Object.<string,number>} A mapping of flag names to bit flag values.
util.makeFlags = function( names ){
    util.assert.isArray( names );
    util.assert( names.length < 64, 'Too many flags' );
    var flags = {
        None : 0
    };
    for( var i = 0; i < names.length; ++i ){
        flags[names[i]] = 1 << i;
    }
    return flags;
};

/// Adds a mutator method to a class.
///
/// @param {Object} proto       The prototype to add the mutator to.
/// @param {string} methodName  The name of the mutator method to create.
/// @param {string} memberName  The name of the class member to set.
util.mutator = function( proto, methodName, memberName ){
    proto[methodName] = function( val ){
        this[memberName] = val;
    };
};
