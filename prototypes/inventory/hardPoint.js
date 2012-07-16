//Out of file variables
var WORLDLIST = WORLDLIST || null;


//This defines the hard points for equipable items onto a character.
var HardPoint = function(){
    this.equiped = [];
};

//checks to see if the given item can fit over previously equiped items.
HardPoint.prototype.canFit = function(itemID){
    var currentThickness = 0;    

    if (!WORLDLIST.worn[itemID]){
        return(false);
    }
    var tolerance = WORLDLIST.worn[itemID].tolerance;
    for (var i in this.equiped){
        var item = WORLDLIST.worn[this.equiped[i]];
        currentThickness += item.thickness;
    }
    return( (tolerance >= currentThickness) );
};

var HardPointProto = HardPoint.prototype;

    /// adds items to the hard point
    ///
    /// @param {Object} item The item to add.
HardPointProto.add = function(item){
    this.equiped.push(item);    
};

/// report weight of the hard point
///
/// @return {number} the weight of all the items on the hardpoint
HardPointProto.getWeight = function(){
    var weight = 0;
    for (var i in this.equiped){
        var item = this.equiped[i].itemID;
        weight += WORLDLIST.basic[item].weight;
        if (typeof item.getWeight !== "undefined"){
            weight += item.getWeight();
        }
    }
    return(weight);
};

