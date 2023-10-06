class Point
{
  constructor(pos,isConnected,strokeWeight)
  {
    this.pos = pos;
    this.isConnected = isConnected;
    this.strokeWeight = strokeWeight || 7;
  }
  display()
  {
    strokeWeight(this.strokeWeight);
    stroke(255);
    point(this.pos.x,this.pos.y);
  }
  connect(pos,sw,s)
  {
    strokeWeight(sw || 2);
    stroke(s || color(255));
    line(this.pos.x,this.pos.y,pos.x,pos.y);
  }
}