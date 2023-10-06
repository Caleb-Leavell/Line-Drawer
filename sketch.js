//Click mouse to add a point
//Press shift to toggle SmartView
//Press space to toggle connecting to the previous point
//ctrl+z to undo
//ctrl+y to redo
//Press backspace to reset
//it will snap to existing nodes


let points = []; //array of Point instances
let pointsUndo = []; //stores points that have been undone for redoing
let pointX = 0; // position of the uninstanciated point
let pointY = 0;
let isConnected = true; //false if the uninstanciated point is the first point in a new shape
let isOver = true; //false if mouse is out of the canvas
let ctrlIsPressed = false; //false if ctrl is not being held down
let smartView = false; //false if SmartView is not toggled on

function setup() 
{
  cnv = createCanvas(600, 600);
}

function draw() 
{
  background(0);
  for (let i = 0; i < points.length; i++)
    {
      if (smartView)
      {
        points[i].connect(createVector(pointX,pointY),1,color(100))
      }
      
      if (i < points.length-1)
      { 
        if (points[i].pos.equals(points[i+1].pos))
        {
          //doesn't display points that are in equal positions
          continue; 
        }
        
        if (points[i+1].isConnected)
        {
          //draws lines between every point
          points[i].connect(points[i+1].pos);
        }
      }
      
      //displays points
      points[i].display();
    }
  
  //makes position of uninstanciated point set to the mouse's position
  pointX = mouseX;
  pointY = mouseY;
  
  //checks if mouse is over canvas
  cnv.mouseOver(isOverTrue);
  cnv.mouseOut(isOverFalse);
  
  //checks if uninstanciated point is close enough to another point to anchor it to that point
  checkIfEqual();
  
  if (isOver)
  {
    //displays the uninstanciated point
    displayCurrentPoint();
  }

  if(!keyIsPressed)
  {
    ctrlIsPressed = false; //detects if ctrl is released
  }
}

function mouseClicked()
{
  //instanciates the uninstanciated point
  points.push(new Point(createVector(pointX,pointY),isConnected));
  //ensures that the new shape has its points connected
  isConnected = true;
  pointsUndo = [];
}

function keyPressed()
{
  //disconnects uninstaniated point
  if (keyCode == 32)
  {
    isConnected = !isConnected; //toggles new shape
  }
  if (keyCode == 8)
  {
    points = []; //reset
  }
  if (keyCode == 17)
  {
    ctrlIsPressed = true; //detects if ctrl is being pressed
  }
  if (key == 'z' && ctrlIsPressed && points.length > 0)
  {
     pointsUndo.push(points[points.length-1]);
     points.pop(); //undo, removes last element in points array
  }
  if (key == 'y' && ctrlIsPressed && pointsUndo.length > 0)
  {
     points.push(pointsUndo[pointsUndo.length-1]);
     pointsUndo.pop();
  }
  if (keyCode == 16)
  {
    smartView = !smartView; //toggles smartview on shift
  }
}

function displayCurrentPoint()
{
  //displays the uninstanciated point
  
  if (points.length > 0 && isConnected)
  {
    points[points.length-1].connect(createVector(pointX,pointY),2,color(255,100,100));
  }
  
  stroke(255);
  strokeWeight(7);
  point(pointX,pointY);
  
  if(points.length > 0)
  {
    points[points.length-1].display();
  }
}

function checkIfEqual()
{
  //anchors the uninstanciated point to a nearby point if the mouse is close enough
  for (let i in points)
  {
      if (dist(pointX,pointY,points[i].pos.x,points[i].pos.y) < 8)
        {
          pointX = points[i].pos.x;
          pointY = points[i].pos.y;
          points[i].strokeWeight = 8;
        }
      else
      {
        points[i].strokeWeight = 7;
      }
  }
}

//checks if mouse is over canvas
function isOverTrue()
{
  isOver = true;
}

function isOverFalse()
{
  isOver = false;
}