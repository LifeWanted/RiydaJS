//The basic item class is used to populate the basic item list object.
//It stores attributes universally shared by all items in Riyda.
var BasicItem = function(name,width,height,weight,value){
    this.name   =   name;
    this.width  =  width;
    this.height = height;
    this.weight = weight;
    this.value  =  value;
};
BasicItem.prototype.volume = function(){
//  This function makes an item report it's volume. In the game this will be
//  part of the inventory organization system
    var volume = this.width * this.height;
    return(volume);
};


//the weapon class is used to populate the weapon item list object.
//weapons are used to deal damage with the aid of a spcified skill
var WeaponItem = function(itemID,equipmentMod,skill){
//  The 'itemID' argument must be the item's key in the basic item list
    this.itemID       =       itemID;
    this.equipmentMod = equipmentMod;
    this.skill        =        skill;
};


//The worn class is used to populate the worn items list object.
//wearable items are equipped on hard points on the character's body.
//items with a tolerance less than the sum of the thickness of all items on a 
//hard point cannot be equipped
var WornItem = function(itemID,thickness,tolerance,hardPoint){
    this.itemID    =    itemID;
    this.thickness = thickness;
    this.tolerance = tolerance;
    this.hardPoint = hardPoint;
};


//The container class is used to populate the container items list object.
//containers act as inventories where unequiped items can be stored inside.
var ContainerItem = function(itemID,width,height){
    this.itemID   = itemID;
    this.width    =  width;
    this.height   = height;
};


//The utility class is used to populate the utility items list object.
//Utility items add extra hard points where 'hooked' items can be equiped
var HookedContainerItem = function(itemID,width){
    this.itemID = itemID;
    this.width  =  width;
};


//The hooked class is used to populate the hooked items list object.
//Items in the hooked list can be equipped to utility items if the sum of all 
//the items' width does not exceed the utility item's wdith
var HookedItem = function(itemID){
    this.itemID = itemID;
};


//The magic class is used to populate the magic items list object.
//Items with a magical affects are stored with their itemID, the effect, 
//and how the affect is activated
var MagicItem = function(itemID,effect,activation){
    this.itemID     =     itemID;
    this.effect     =     effect;
    this.activation = activation;
};

//The consumable class is used to populate the consumable items list object.
//consumable items are equipped once and then dissappear
var ConsumableItem = function(itemID){
    this.itemID = itemID;
};

//fake magic affect for sake of example
var eff_fireResist = function(){
};
