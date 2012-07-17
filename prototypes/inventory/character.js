var HardPoint = HardPoint || null;
var WORLDLIST = WORLDLIST || null;

// [oz] Each class should get its own file. Easier to find stuff that way.
var Character = function(){
    // [oz] The character class will probably have more than just hardpoints.
    //      you should put these inside a `_hardPoints` map or something like
    //      that.
    this._hardPoints = {
        head  : new HardPoint(),
        torso : new HardPoint(),
        waist : new HardPoint(),
        legs  : new HardPoint(),
        rHand : new HardPoint(),
        lHand : new HardPoint(),
        rFoot : new HardPoint(),
        lFoot : new HardPoint()
    };
};

var CharacterProto = Character.prototype;
//equips a given item to that item's desgnated hard point
CharacterProto.equip = function(item){
    var itemID = item.itemID;
    var hardPoint = WORLDLIST.worn[itemID].hardPoint;
    if (this._hardPoints[hardPoint].canFit(itemID) === true) {
        this._hardPoints[hardPoint].add(item);
    }
};

//reports the weight of all equipped items and items inside equipped items
CharacterProto.getWeight = function() {
    var weight = 0;
    for (var i in this._hardPoints){
        weight += this._hardPoints[i].getWeight();
    }
    return(weight);
};

//lists all the items in the inventory by search param
CharacterProto.getInventory = function(hardPoint){
    hardPoint = hardPoint || null;
    if (hardPoint !==null) {
        return this._hardPoints[hardPoint].equiped;
    }
    else {
        var allPoints = [];
        for (var i in this._hardPoints) {
            allPoints.push(this._hardPoints[i]);
        }
        return allPoints;
    }
};