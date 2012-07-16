var WORLDITEMLIST = WORLDITEMLIST || null;
var player = player || null;

//function produces a list of items based on criteria in a given inventory
var listInventory = function (inventory,search){
    search = search || 'basic';
    var output = '';
    for (var i in inventory._contents){
        if (WORLDITEMLIST[search][inventory._contents[i]]){
            output += inventory._contents[i] + '<br>';
        }
    }
    return output;
};

$(document).ready(function(){
//  assigning jQuery objects to variables
    var $hardPoints = $('#hardPoints');
    var $display = $('.display');
    $display.data('state', 'none');


//  creates functionality for list buttons
    $hardPoints.click( function(){
        if ($display.data('state') !== 'hardPoints'){
            $display.empty();
            $display.data('state', 'hardPoints');
            $('.display').append('<div class="hardPointButton" id="head">Head</div>');
            $('.display').append('<div class="hardPointButton" id="neck">Neck</div>');
            $('.display').append('<div class="hardPointButton" id="torso">Torso</div>');
            $('.display').append('<div class="hardPointButton" id="rHand">Right Hand</div>');
            $('.display').append('<div class="hardPointButton" id="lHand">Left Hand</div>');
            $('.display').append('<div class="hardPointButton" id="legs">Legs</div>');
            $('.display').append('<div class="hardPointButton" id="rFoot">Right Foot</div>');
            $('.display').append('<div class="hardPointButton" id="lFoot">Left Foot</div>');
            $('.display').append('<div class="portrait"></div>');
            $('.display').append('<div class="hardPointContents"></div>');
            $('.hardPointContents').append('<div class="displayButton" id="equipButton">Equip</div>');
            $('.hardPointContents').append('<div class="displayButton" id="inventoryButton">Inventory</div>');
            $('.hardPointContents').append('<div class="information" id="itemInfo"></div>');
            
//          function for buttons when you click them.
            $('.display').delegate('.hardPointButton', 'click' , function(){
                var hPContents = player._hardPoints[this.id].equiped;
                console.log(this.id);
                $('.information').empty();
                for (var i in hPContents) {
                    $('.information').append('<div class="itemButton">'+hPContents[i].name+'</div>');
                }
            });
        }
    });
});