//Out of file variables
var BasicItem           = BasicItem           || null;
var WeaponItem          = WeaponItem          || null;
var WornItem            = WornItem            || null;
var ContainerItem       = ContainerItem       || null;
var HookedContainerItem = HookedContainerItem || null;
var HookedItem          = HookedItem          || null;
var MagicItem           = MagicItem           || null;
var ConsumableItem      = ConsumableItem      || null;
var eff_fireResist      = eff_fireResist      || null;


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
    hookedContainer    : {
        cont_pack     : new HookedContainerItem(   "cont_pack", 48),
        leather_belt  : new HookedContainerItem("leather_belt", 48)
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

