//This class describes the utility items.

var Utility = function(width){
    this.width = width;
    this.contents = []
}

//reports on the remaining space on the utility
Utility.prototype.emptySpace = function(){
    var usedSpace = 0;
    for (var i in this.contents){
        var item = WORLDLIST.basic[this.contents[i]];
        usedSpace += (item.width);
    }
    var emptySpace = (this.width) - usedSpace;
    return(emptySpace);
};

//This function adds new items to the inventory after checking their size.
Utility.prototype.add = function(item){
    var itemID = item.itemID;
    var width  = WORLDLIST.basic[itemID].width;
    if (WORLDLIST.hooked[itemID] &&
    width < this.emptySpace() ){
        this.contents.push(itemID);
    }
};

//weight report function is identical to the inventory's
Utility.prototype.weightReport = Inventory.prototype.weightReport;

//reports on the encumberance of long items on the utility
Utility.prototype.dangleReport = function() {
    var dangle = 0;
    for (var i in this.contents){
        var item = WORLDLIST.basic[this.contents[i]];
        dangle += (item.length);
    }
    return(dangle);
};
