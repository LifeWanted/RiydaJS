//This defines the hard points for equipable items onto a character.
var HardPoint = function(){
    this.equiped = [];
};

//checks to see if the given item can fit over previously equiped items.
HardPoint.prototype.canFit = function(itemID){
    var currentThickness = 0;
    var canFit = false;
    
    // [oz] Flip this conditional and just return false. Doing that removes an
    //      extra level of indentation.
    if (WORLDLIST.worn[itemID]){
        var tolerance = WORLDLIST.worn[itemID].tolerance;
        for (var i in this.equiped){
            var item = WORLDLIST.worn[this.equiped[i]];
            currentThickness += item.thickness;
        }
        
        // [oz] Better to just `return tolerance >= currentThickness;`
        if (tolerance >= currentThickness){
            canFit = true;
        }
    }
    return(canFit);
};

//adds items to the hard point
HardPoint.prototype.add = function(item){
    this.equiped.push(item);    
};

//report weight of the hard point
HardPoint.prototype.weightReport = function(){
    var weight = 0;
    for (var i in this.equiped){
        // [oz] You call this an itemID, but you ask it for its weight below.
        var itemID = this.equiped[i];
        weight += WORLDLIST.basic[itemID].weight;
        if (itemID.weightReport){
            weight += itemID.weightReport();
        }
    }
    return(weight);
};

// [oz] Each class should get its own file. Easier to find stuff that way.
var Character = function(){
    // [oz] The character class will probably have more than just hardpoints.
    //      you should put these inside a `_hardPoints` map or something like
    //      that.
    this.head  = new HardPoint();
    this.torso = new HardPoint();
    this.waist = new HardPoint();
    this.legs  = new HardPoint();
    this.rHand = new HardPoint();
    this.lHand = new HardPoint();
    this.rFoot = new HardPoint();
    this.lFoot = new HardPoint();
};


//equips a given item to that item's desgnated hard point
Character.prototype.equip = function(item){
    var itemID = item.itemID;
    var hardPoint = WORLDLIST.worn[itemID].hardPoint;
    if (this[hardPoint].canFit(itemID) === true) {
        this[hardPoint].add(item);
    }
};

//reports the weight of all equipped items and items inside equipped items
Character.prototype.weightReport = function() {
    var weight = 0;
    for (var i in this){
        weight += i.weightReport();
    }
    return(weight);
};
