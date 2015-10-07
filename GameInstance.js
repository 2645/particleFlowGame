var canvas;
var context;
var particles = [];
var emitters = [];
var maxParticlesAllive = 1200;
var ParticlesPerFrame = 4;
var particleSize = 3;
var fields = [];
var walls = [];
var collectors = [];

function GameInstance(){
    
}

GameInstance.prototype.run = function(){
    canvas = document.getElementById("canvasOne");
    canvas.addEventListener('click',mouseClick,false);
    context = canvas.getContext("2d");
    emitters.push(new Emitter(new Vector(300,0), Vector.fromAngle(Math.PI*2*1/4, 3)));
    collectors.push(new Collector(new Vector(100,600),100,true));
    walls.push(new Wall(new Vector(300,300),100));
    return loop();
}

function mouseClick(event){
    var pos = getMousePosInCanvas(event);
    fields.push(new Field(new Vector(pos.x,pos.y), -100));
}

function getMousePosInCanvas(event){
    var rect = canvas.getBoundingClientRect();
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
        console.log("you win");
        return true;
    };
    isActive();
}

function clear(){
    context.clearRect(0,0,canvas.width,canvas.height);
}

function isActive(){
    window.requestAnimationFrame(loop);
}

function update(){
    addNewParticles();
    moveParticles(canvas.width, canvas.height);
}

function draw(){
    for(var i = 0 ; i < particles.length ; i++){
        particles[i].draw(context);
    }
    for(var i = 0 ; i < fields.length ; i++){
        fields[i].draw(context);
    }
    for(var i = 0 ; i < emitters.length ; i++){
        emitters[i].draw(context);
    }
    for(var i = 0 ; i < walls.length ; i++){
        walls[i].draw(context);
    }
    for(var i = 0 ; i < collectors.length ; i++){
        collectors[i].draw(context);
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


