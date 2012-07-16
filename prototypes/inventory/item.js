var WORLDLIST = WORLDLIST || null;
var Inventory = Inventory || null;
var HookableContainer = HookableContainer || null;

// The class for the objects where are literally the items stored and equiped. 
// The worldlist is referenced for all generic item properties, but each unique 
// object is it's own object using this class.

var Item = function(itemID,name){
    if (WORLDLIST.basic[itemID]){
        this.itemID    = itemID;
        this.name      = name;
        this.condition = 100;
    }
//  checks if item is a container and adds an inventory if it is
    if (WORLDLIST.container[itemID]){
        var width  = WORLDLIST.container[itemID].width;
        var height = WORLDLIST.container[itemID].height;
        this.container = new Inventory(width,height);
    }
//  checks if item is a utility and adds a utility if it is
    if (WORLDLIST.hookedContainer[itemID]){
        var width  = WORLDLIST.hookedContainer[itemID].width;
        this.hooks = new HookableContainer(width);
    }
};
    
    
