
var app;
var client;
var me;

$(function(){
    app = new Riyda.Application();
    app.setServer( new Combat.Server() );
    app.init();
    client  = new Combat.Client();
    me      = client.getPlayer();
});
