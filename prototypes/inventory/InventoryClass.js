//This class describes the inventory object that stores items on a 
//high resolution grid. This affect is simulated as of now because it requires
//a GUI to operate.

var Inventory = function(width,height){
    this.width    =  width;
    this.height   = height;
    this.contents = [];
};

//this function reports on the remaining space in the inventory that remains.
Inventory.prototype.emptySpace = function(){
    var usedSpace = 0;
    for (var i in this.contents){
        var item = WORLDLIST.basic[this.contents[i]];
        usedSpace += (item.width * item.height);
    }
    var emptySpace = (this.width * this.height) - usedSpace;
    return(emptySpace);
};

//This function adds new items to the inventory after checking their size.
Inventory.prototype.add = function(item){
    var itemID = item.itemID;
    var width  = WORLDLIST.basic[itemID].width;
    var height = WORLDLIST.basic[itemID].height;
    var volume = width * height;
    
    if (width  < (this.width && this.height) && 
    height < (this.width && this.height) &&
    volume < this.emptySpace() ){
        this.contents.push(itemID);
    }
};

//this function reports on the total weight of the inventory
Inventory.prototype.weightReport = function(){
    var weight = 0;
    for (var i in this.contents){
        var itemID = this.contents[i];
        weight += WORLDLIST.basic[itemID].weight;
    }
    return(weight);
};
