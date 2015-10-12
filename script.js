var gameInstance;

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
    gameInstance = new GameInstance();
    gameInstance.run(gameInstanceDone);
}

function gameInstanceDone(gameInstanceFinished){
    gameInstanceFinished.won?nextLevel():mainMenu();
}

function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}

function nextLevel() {
    gameInstance = null;
    gameInstance = new GameInstance();
    gameInstance.run(gameInstanceDone);
    console.log("next level!!!");
}

function mainMenu() {
    console.log("main menu!!!");
    canvasMain = document.getElementById("canvasMain");
    var ctx = canvasMain.getContext("2d");
    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(0,0,canvasMain.width,canvasMain.height);
}







