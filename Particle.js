function Particle(point, velocity, acceleration){
    this.position = point || new Vector(0,0);
    this.velocity = velocity || new Vector(0,0);
    this.acceleration = acceleration || new Vector(0,0);
}

Particle.prototype.move = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
};

Particle.prototype.fieldInfluence = function(fields){
    var totalAccelX = 0;
    var totalAccelY = 0;
    
    for( var i = 0; i < fields.length ; i++){
        var field = fields[i];
        var vectorX = field.position.x - this.position.x;
        var vectorY = field.position.y - this.position.y;
        
        var force = field.mass / Math.pow(Math.pow(vectorX,2)+Math.pow(vectorY,2),1.5);
        
        totalAccelX += vectorX * force;
        totalAccelY += vectorY * force;
        
    }
    this.acceleration = new Vector(totalAccelX,totalAccelY);
}

Particle.prototype.draw = function(context){
    var position = this.position;
    context.fillStyle = "chartreuse";
    context.fillRect(position.x,position.y,particleSize,particleSize);
}

Particle.prototype.isColliding = function(objects){
    var colliding;
    for(var i = 0 ; i < objects.length ; i++){
        var object = objects[i];
        colliding = (Math.abs(object.position.x - this.position.x) <= object.width/2 && Math.abs(object.position.y - this.position.y) <=  object.height/2);
        if(colliding){
            object.particlesCollided++;
        }
    }
    return colliding;
}

