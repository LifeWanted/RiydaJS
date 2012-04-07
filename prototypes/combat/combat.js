
// External variables.
var Combat = Combat || null;

// Global variables.
var app;
var me;

$(function(){
    app = new Combat.Application();
    app.init();
    me = app.getPlayer();
});
