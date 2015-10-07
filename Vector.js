function Vector(x, y){
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
};

Vector.prototype.getMagnitude = function(){
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
};

Vector.prototype.getAngle = function(){
    return Math.atan2(this.y,this.x);
};

Vector.fromAngle = function (angle, magnitude){
    return new Vector(magnitude*Math.cos(angle),  magnitude*Math.sin(angle));
};