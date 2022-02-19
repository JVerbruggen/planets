var drawWidth;
var drawHeight;

var translateX;
var translateY;

var extraBounds;

function setup() {
  // put setup code here
  drawWidth = windowWidth;
  drawHeight = windowHeight;

  extraBounds = parseInt(2*drawHeight);

  translateX = 0;
  translateY = 0;

  createCanvas(drawWidth, drawHeight);
  initMode();
  initPlanets();
  initStarBackground();
  initMouse();
}

function draw() {
  // put drawing code here
  clear();
  colorMode(RGB);
  background(color(0,0,0));

  if(mouseIsPressed){
    mouseState.onMouseDown();
  }else{
    mouseState.onMouseUp();
  }

  drawBackground();
  gameMode.drawMode();
  updatePlanets();
}

function keyPressed() {
  if (keyCode === SHIFT) {
    gameMode.pressShift();
  }
}

function inFrame(x,y){
  return x-translateX >= 0 && x-translateX < drawWidth && y-translateY >= 0 && y-translateY < drawHeight;
}

function planetInFrame(x,y,radius){
  let drawX = x-translateX;
  let drawY = y-translateY;

  return drawX+radius+extraBounds >= 0 && drawX-radius-extraBounds < drawWidth && drawY+radius+extraBounds >= 0 && drawY-radius-extraBounds < drawHeight;
}

function updatePlanets(){
  for(var planet of factory.planets){
    if(!planetInFrame(planet.x, planet.y, planet.radius)
      || !planet.exists){
      factory.despawn(planet);
      return;
    }

    for(var other of factory.planets){
      let distance = planet.distance(other);
      if(distance == 0) continue;
      if(distance < (planet.radius + other.radius)){
        planet.collide(other);

        if(planet.mass <= other.mass) continue;
      }

      let vy = other.y - planet.y;
      let vx = other.x - planet.x;
      
      // Normalizing
      vy /= distance;
      vx /= distance;

      let fgrav = other.mass / distance;

      vy *= fgrav;
      vx *= fgrav;

      planet.addForce(vx, vy);
    }

    planet.doTick();
    planet.draw();
  }
}

function relativeMX(){
  return mouseX + translateX;
}

function relativeMY(){
  return mouseY + translateY;
}

function absoluteMX(){
  return mouseX;
}

function absoluteMY(){
  return mouseY;
}