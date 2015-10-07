function Field(point, mass){
    this.position = point;
    this.setMass(mass);
    this.color = "white";
}

Field.prototype.setMass = function(mass){
    this.mass = mass || 100;   
    this.size = Math.abs(this.mass*15/100);
}
Field.prototype.draw = function(context){
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}