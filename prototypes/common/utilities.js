
var util = {

    /// Creates an abstract function.
    ///
    /// @throws {Error} If called. Abstract methods should not be called.
    ///
    /// @param {string} methodName  The name of the abstract method.
    'abstract' : function( methodName ){
        return function(){
            throw new Error( 'Abstract method "' + methodName + '" called.' );
        };
    },

    /// Asserts that the given value is true.
    ///
    /// @throws {Error} If `val` is not true.
    ///
    /// @param {boolean}    val The value to assert for truth.
    'assert' : function( val ){
        if( !val ){
            throw new Error( 'Assertion failure.' );
        }
    },

    /// Generates a new random ID.
    ///
    /// @return {string} The new ID string.
    'generateID' : function(){
        var id = Math.ceil( Math.random() * 0xffff )
               * Math.ceil( Math.random() * 0xffff );
        return '_id:' + id;
    },

    /// Sets up `derived` to inherit from `base`.
    ///
    /// @param {function}   base    The base class constructor.
    /// @param {function}   derived The derived class constructor.
    'inherit' : function( base, derived ){
        derived.prototype = new base();
        derived.prototype.constructor = derived;
        derived.prototype._super = base._super || base;
    }

};

