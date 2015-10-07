function Emitter(point, velocity, spread,maxParticlesEmitted) {
    this.position = point;
    this.velocity = velocity;
    this.spread = spread ||Math.PI / 64;
    this.color = "red";
    this.maxParticlesEmitted = maxParticlesEmitted || 4000;
    this.particlesEmitted = 0;
}

Emitter.prototype.emitParticle = function(){
    var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread* 2);
    var magnitude = this.velocity.getMagnitude();
    var position = new Vector(this.position.x, this.position.y);
    var velocity = Vector.fromAngle(angle, magnitude);
    this.particlesEmitted+=1;
    return new Particle(position, velocity);
    
};

Emitter.prototype.canEmitParticle = function(){
    return this.particlesEmitted<this.maxParticlesEmitted;
}

Emitter.prototype.draw = function(context){
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.position.x, this.position.y, 15, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}