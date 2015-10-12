
function Wall(point, width, height){
    this.position = point;
    this.width = width;
    this.height = height;
    this.xTop = this.position.x - this.width/2;
    this.yTop = this.position.y - this.height/2;
}

Wall.prototype.isColliding = function(particle){
    var colliding = (Math.abs(this.position.x - particle.position.x) <= this.width/2 && Math.abs(this.position.y - particle.position.y) <=  this.height/2);
    if(colliding){
        this.particlesCollided++;
    }
    return colliding;
}

Wall.prototype.draw = function(context){
    context.fillStyle="#1486cc";
    context.fillRect(this.xTop, this.yTop, this.width, this.height);
}
