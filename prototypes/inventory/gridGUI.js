var WORLDLIST = WORLDLIST || null;
var hardPoints = hardPoints || null;
//operates the visual assets of the inventory grid.
document.write('<table align="right" cellspacing="0" cellpadding="0" id="table"></table>');
var displayGrid = {
    table : document.getElementById("table"),
    image : "tile.png"
};
displayGrid.print = function(inventory){
    this.table.innerHTML = allInventories.getGrid(inventory.itemID,this.image);
};

/// Contains all the inventoires equiped to a character.
var allInventories = {
    inventories : []
};
/// Gets all the equipped inventories and adds them to the inventories property.
///
/// @param {Object} the character who's inventores will be displayed.
allInventories.getInventories = function(character){
    for (var i in character._hardpoints) {
        var hardPoints = character._hardpoints[i];
        
        for (var ii in hardPoints){
            var item = hardPoints[ii];
            
            if (WORLDLIST.container[item.itemID]){
                this.inventories.push(character._hardpoints[i][ii]);
            }
        }
    }
};
/// Returns the selected inventories grid in HTML
///
/// @param {Object} desired inventory
///
/// @return HTML code representing the inventory grid
allInventories.getGrid = function(inventory,image) {
    var output  = "";
    var rows    = WORLDLIST.container[ inventory ].height;
    var columns = WORLDLIST.container[ inventory ].width;
    
    for (var i = 0; i <= rows; ++i){
        
        output += "<tr>";
        for (var ii = 0; ii <= columns; ++ii){
            output += '<td><img src="'+image+'" /></td>';
        }
        output += "</td>";
    }
    return output;
};