var Debugger = function(){};
Debugger.log = function (message) {
    try {
        console.log(message);
    } catch (exception) {
        return;
    }
};

window.addEventListener("load",init,false);


function init(){
    Debugger.log("De pagina is ingeladen");
    startTheApp();
}

function startTheApp(){
    if(!canvasSupport()){
        Debugger.log("Something went wrong!");
        return false;    
    }      
    var gameInstance = new GameInstance();
    gameInstance.run();
    
}

function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}







