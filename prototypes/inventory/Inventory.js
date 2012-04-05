var Inv = Inv || {};

/// The `Inventory` object stores items on a high resolution grid. This effect
/// is simulated as of now because it requires a GUI to operate.
Inv.Inventory = (function(){
    /// @constructor
    ///
    /// @param {number} width   The width of the container.
    /// @param {number} height  The height of the container.
    function Inventory( width, height ){
        this._width     = width;
        this._height    = height;
        this._contents  = [];
    }
    // [oz] This is a little trick that helps reduce your typing and also
    //      reduces file size considerably when dealing with large classes and
    //      Google's closure compiler (common when doing web development).
    var InventoryProto = Inventory.prototype;

    /// Calculates the remaining space.
    ///
    /// @return {number} The area of the remaining space.
    InventoryProto.getEmptySpace = function(){
        var usedSpace = 0;
        for( var i in this._contents ){
            var item = WORLDLIST.basic[this.contents[i]];
            usedSpace += (item.width * item.height);
        }
        var emptySpace = (this.width * this.height) - usedSpace;
        return emptySpace;
    };

    // [oz] This function should receive an itemID instead of an item. All it
    //      cares about is the itemID anyways.
    /// Adds a new item to the inventory after checking its size.
    ///
    /// @param {Object} item The item to add.
    InventoryProto.add = function( item ){
        var itemID = item.itemID;
        var width  = WORLDLIST.basic[itemID].width;
        var height = WORLDLIST.basic[itemID].height;
        var volume = width * height;    // [oz] This is an area, not volume.

        // [oz] Two problems with the checks below. First, `a < (b && c)` is
        //      checking if `a` is less than the boolean value `b && c` not if
        //      `a` is less than `b` and `a` is less than `c`. Secondly this
        //      check does not account for oblong inventories and square items.
        //      For instance, a 3 by 1 inventory would fit a 2 by 2 item
        //      according to this check (assuming the first item is fixed).
        //
        //      To solve both of these problems you need:
        //
        //      (width < this._width  && height < this._height) ||
        //      (width < this._height && height < this._width)
        if( width  < (this._width && this._height) &&
            height < (this._width && this._height) &&
            volume < this.getEmptySpace()
        ){
            this._contents.push( itemID );
        }
    };

    // [oz] Rather than "report" people usually just use "get". The technical
    //      term for this kind of function (one that simply reads object state
    //      and returns a single result) is an "accessor", but all the cool kids
    //      call them "getters". The opposite (a function that just assigns a
    //      value) is called a "mutator" or "setter". They are usually preceeded
    //      with "set".
    /// Calculates the total weight of the inventory.
    ///
    /// @return {number} The weight of the items in the inventory.
    InventoryProto.getWeight = function(){
        var weight = 0;
        for( var i in this._contents ){
            var itemID = this._contents[i];
            weight += WORLDLIST.basic[itemID].weight;
        }
        return weight;
    };

    return Inventory;
})();

