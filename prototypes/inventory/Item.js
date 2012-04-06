// [oz] This class is never used. Are the other item classes listed in
//      WorldItemList.js supposed to inherit from this one?
//all items will be unique objects in code with some unique qualities
//every item will reference an item from the world list for it's generic properties.
var ItemClass = function(itemID,name){
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
    if (WORLDLIST.utility[itemID]){
        var width  = WORLDLIST.utility[itemID].width;
        this.container = new Utility(width);
    }
};
    
    
