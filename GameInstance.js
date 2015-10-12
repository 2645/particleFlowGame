var canvasMain;
var contextMain;
var particles = [];
var emitters = [];
var maxParticlesAllive = 1200;
var ParticlesPerFrame = 4;
var particleSize = 3;
var fields = [];
var walls = [];
var maxFields;
var collectors = [];
var callBack;


function GameInstance(){
    maxFields = 5;
    this.won  = false;
    console.log("new game");
}

GameInstance.prototype.run = function(callback){
    callBack = callback;
    canvasMain = document.getElementById("canvasMain");
    canvasMain.addEventListener('click',mouseClick,false);
    contextMain = canvasMain.getContext("2d");
    emitters.push(new Emitter(new Vector(200,0), Vector.fromAngle(Math.PI*2*1/4, 3)));
    collectors.push(new Collector(new Vector(100,400),100,true));
    walls.push(new Wall(new Vector(200,200),100,100));
    walls.push(new Wall(new Vector(100,0),100,500));
    return loop();
}

function mouseClick(event){
    if(maxFields > fields.length){
        var pos = getMousePosInCanvas(event);
        fields.push(new Field(new Vector(pos.x,pos.y), -100));
    }
}

function getMousePosInCanvas(event){
    var rect = canvasMain.getBoundingClientRect();
    return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
}

function loop(){
    clear();
    update();
    draw();
    if(checkWin()){
        this.won = true;
        cleanUp();
        callBack(this);
        return;
    };
    if(checkLos()){
        this.won = false;
        cleanUp();
        callBack(this);
        return;
    };
    isActive();
}

function clear(){
    contextMain.clearRect(0,0,canvasMain.width,canvasMain.height);
}

function isActive(){
    window.requestAnimationFrame(loop);
}

function update(){
    addNewParticles();
    moveParticles(canvasMain.width, canvasMain.height);
}

function draw(){
    for(var i = 0 ; i < particles.length ; i++){
        particles[i].draw(contextMain);
    }
    for(var i = 0 ; i < fields.length ; i++){
        fields[i].draw(contextMain);
    }
    for(var i = 0 ; i < emitters.length ; i++){
        emitters[i].draw(contextMain);
    }
    for(var i = 0 ; i < walls.length ; i++){
        walls[i].draw(contextMain);
    }
    for(var i = 0 ; i < collectors.length ; i++){
        collectors[i].draw(contextMain);
    }    
}

function addNewParticles(){
    if(particles.length > maxParticlesAllive) return;
    for(var i = 0 ; i < emitters.length ; i++){
        if(emitters[i].canEmitParticle()){        
            for(var j = 0 ; j < ParticlesPerFrame ; j++){
                particles.push(emitters[i].emitParticle());
            }        
        }        
    }
}

function moveParticles(boundsX, boundsY){
    var currentParticles = [];
    
    for(var i = 0 ; i < particles.length ; i++){
        var particle = particles[i];
        var pos = particle.position;     
        if(pos.x < 0 || pos.x > boundsX || pos.y < 0  || pos.y > boundsY || particle.isColliding(collectors) || particle.isColliding(walls))continue;
        particle.fieldInfluence(fields);
        particle.move();
        currentParticles.push(particle);       
    }
    particles = currentParticles;
}

function checkWin(){
    for(var i = 0 ; i < collectors.length ; i++){
        var collector = collectors[i];
        if(!(collector.maxParticlesCollided <= collector.particlesCollided)){
            return false;
        }
    }
    return true;
}

function checkLos(){
    for(var i = 0 ; i < emitters.length ; i++){
        var emitter = emitters[i];
        if(emitter.canEmitParticle() || particles.length > 0){
            return false;
        }
    }
    return true;
}

function cleanUp(){
    canvasMain  = null;
    contextMain = null;
    particles = [];
    emitters = [];
    maxParticlesAllive = 1200;
    ParticlesPerFrame = 4;
    particleSize = 3;
    fields = [];
    walls = [];
    maxFields = null;
    collectors = [];
}


