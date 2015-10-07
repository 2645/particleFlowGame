function Collector(point, size, horizontal){
    this.position = point;
    this.size = size;
    this.horizontal = horizontal;
    this.particlesCollided = 0;
    this.maxParticlesCollided = 1000;
    this.generateCollisionPoints();
    
}

Collector.prototype.generateCollisionPoints = function(){
    if(this.horizontal){
        this.xTop = this.position.x-this.size/2;
        this.yTop = this.position.y-20;
        this.width = this.size;
        this.height = 40;
        
    }else{
        this.xTop = this.position.x-20;
        this.yTop = this.position.y-this.size/2;
        this.width = 40;
        this.height = this.size;
    }
}

Collector.prototype.draw = function(context){
    var grd = context.createLinearGradient(this.xTop, this.yTop, this.xTop, this.yTop +  this.height * 2 * this.particlesCollided / this.maxParticlesCollided);
    grd.addColorStop(0, "chartreuse");
    grd.addColorStop(1, "grey");
    context.fillStyle = grd 
    if(this.particlesCollided === 0){
        context.fillStyle="grey";
    }
    context.fillRect(this.xTop, this.yTop, this.width, this.height);
}
