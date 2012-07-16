//Out of file variables
var WORLDLIST = WORLDLIST || null;
var Inventory = Inventory || null;

// [oz] I think this class could be better named. I do not know what a "HookableContainer
//      item" is. From the code it seems to be any item that can have other
//      items put in it or hang from it such as a backpack or belt.
//This class describes the HookableContainer items.

var HookableContainer = function(width){
    this.width = width;
    this.contents = [];
};

//reports on the remaining space on the HookableContainer
HookableContainer.prototype.emptySpace = function(){
    var usedSpace = 0;
    for (var i in this.contents){
        var item = WORLDLIST.basic[this.contents[i]];
        usedSpace += (item.width);
    }
    var emptySpace = (this.width) - usedSpace;
    return(emptySpace);
};

// [oz] You seem to have a lot of classes with a `contents` member and `add` and
//      `weightReport` methods. You should add a `Container` (or similarly
//      named) base class with these methods and have these other classes
//      inherit from it.
//This function adds new items to the inventory after checking their size.
HookableContainer.prototype.hookOn = function(item){
    var itemID = item.itemID;
    var width  = WORLDLIST.basic[itemID].width;
    if (WORLDLIST.hooked[itemID] &&
    width < this.emptySpace() ){
        this.contents.push(itemID);
    }
};

//weight report function is identical to the inventory's
HookableContainer.prototype.getWeight = Inventory.prototype.getWeight;

//reports on the encumberance of long items on the HookableContainer
HookableContainer.prototype.getDangle = function() {
    var dangle = 0;
    for (var i in this.contents){
        var item = WORLDLIST.basic[this.contents[i]];
        dangle += (item.length);
    }
    return(dangle);
};
