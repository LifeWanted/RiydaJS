//This lists all the items in the game that are relevant to each category.
//Items can be in multiple cetegories by being on multiple lists.

var WORLDLIST = {
//  The basic list lists all items in the game 
//  and stores attributes common to all items
    basic      : {
        iron_sword    : new BasicItem(    "Sword", 4, 48, 20, 10),
        wood_club     : new BasicItem(     "Club", 5, 36,  1,  5),
        ring          : new BasicItem(     "Ring", 1,  1,  1, 50),
        iron_helmet   : new BasicItem(   "Helmet", 2,  2,  4, 20),
        iron_cuirass  : new BasicItem(  "Cuirass", 5,  7, 20, 50),
        cotton_pants  : new BasicItem(    "Pants", 4,  4,  2,  5),
        leather_boots : new BasicItem(    "Boots", 3,  3,  3, 20),
        leather_belt  : new BasicItem(     "Belt", 1,  1,  1,  5),
        potion_health : new BasicItem(   "Potion", 2,  3,  2, 15),
        cont_pack     : new BasicItem("Back Pack", 2,  3,  1, 15),
        cont_bag      : new BasicItem(      "Bag", 1,  1,  1,  2)
    },
    weapon     : {
        iron_sword    : new WeaponItem("iron_sword", 4, "sharp"),
        wood_club     : new WeaponItem( "wood_club", 3, "blunt")
    },
    worn       : {
        ring          : new WornItem(         "ring",  2,  1, "finger"),
        iron_helmet   : new WornItem(  "iron_helmet", 10,  3,   "head"),
        iron_cuirass  : new WornItem( "iron_cuirass", 10,  5,  "torso"),
        cotton_pants  : new WornItem( "cotton_pants",  2,  3,   "legs"),
        leather_boots : new WornItem("leather_boots", 10,  3,   "feet"),
        leather_belt  : new WornItem( "leather_belt",  2, 20,  "waist"),
        cont_pack     : new WornItem(  "cont_quiver",  4, 20,  "torso")
    },
    container  : {
        cont_pack     : new ContainerItem(   "cont_pack", 32, 48),
        cont_bag      : new ContainerItem(    "cont_bag",  5,  5),
        cotton_pants  : new ContainerItem("cotton_pants",  3,  4)
    },
    utility    : {
        cont_pack     : new UtilityItem(   "cont_pack", 48),
        leather_belt  : new UtilityItem("leather_belt", 48)
    },
    hooked     : {
        iron_sword    : new HookedItem("iron_sword"),
        wood_club     : new HookedItem( "wood_club"),
        cont_bag      : new HookedItem(  "cont_bag")
        },
    magic      : {
        ring          : new MagicItem(   "ring", eff_fireResist,     "worn"),
        potion        : new MagicItem( "potion", eff_fireResist, "consumed") 
    },
    consumable : {
        potion        : new ConsumableItem("potion")   
    }
};


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
var UtilityItem = function(itemID,width){
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