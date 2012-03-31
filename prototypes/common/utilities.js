
var util = {

    /// Asserts that the given value is true.
    ///
    /// @throws {Error} If `val` is not true.
    ///
    /// @param {boolean} val The value to assert for truth.
    'assert' : function( val ){
        if( val ){
            throw new Error( 'Assertion failure.' );
        }
    }

    /// Sets up `derived` to inherit from `base`.
    ///
    /// @param {function} base      The base class constructor.
    /// @param {function} derived   The derived class constructor.
    'inherit' : function( base, derived ){
        derived.prototype = new base();
        derived.prototype.constructor = derived;
        derived.prototype._super = base;
    }

};

