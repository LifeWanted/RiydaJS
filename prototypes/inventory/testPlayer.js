var Character = Character || null;
var itemList  = itemList  || null;

//This is a test character for the demo.


var player = new Character();
player.equip(itemList[2]);
player.equip(itemList[1]);
player._hardPoints.torso.equiped[0].hooks.hookOn(itemList[0]);