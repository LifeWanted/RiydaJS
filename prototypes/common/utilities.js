
var util = {

    'inherit' : function( base, derived ){
        derived.prototype = new base();
        derived.prototype.constructor = derived;
    }

};

