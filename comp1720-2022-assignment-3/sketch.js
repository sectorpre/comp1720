speed = 10
oscillators = []
numBouncers = 0
textWidth1 = 0
textHeight1 = 0
textWidth2 = 0
textHeight2 = 0

bouncers = [{
  start: 0,
  allPoints: [],
  currentPoint: 1,
  endOfPoints: 0,
  xOffset: 1,
  yOffset: 1,
  xEnd: 200,
  yEnd: 500,
  xStart: 200,
  yStart: 500,
  angle: 100,
  oscillator: new p5.Oscillator("triangle")
}]
  

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(5);
  //rect(0, 0, width, height);
  textWidth1 = windowWidth/7
  textHeight1 = windowHeight/3
  textWidth2 = windowWidth/10
  textHeight2 = windowHeight/5
  background(0,0,0);
}

function playSound(osc, angle) {
  // plays a sound according to angle
  osc.freq((angle/360)*(1050-525) + 525, 0.1);
  osc.amp(0.6, 0.1);
}

function lineDraw(bouncer) {
  // draws the line a bouncer is currently on according to a (xStart, yStart) and a (xEnd, yEnd)
  strokeWeight(30);
  stroke('red');
  line(bouncer.xStart,bouncer.yStart,bouncer.xEnd,bouncer.yEnd);

  strokeWeight(25);
  stroke('orange');
  line(bouncer.xStart,bouncer.yStart,bouncer.xEnd,bouncer.yEnd);

  strokeWeight(10);
  stroke('white');
  line(bouncer.xStart,bouncer.yStart,bouncer.xEnd,bouncer.yEnd);
}

function angleGet(bouncer) {
  // gets an angle to the currentPoint

  // if bouncer has hit its final point
  if (bouncer.currentPoint >= (bouncer.allPoints.length)) {
    bouncer.endOfPoints = 1
    bouncer.currentPoint = 0;
  }

  // calculates angle of bounce
  bouncer.angle = atan(((bouncer.allPoints[bouncer.currentPoint][1] - bouncer.yEnd)/(bouncer.allPoints[bouncer.currentPoint][0] - bouncer.xEnd)))*180/3.1412;
  if (bouncer.allPoints[bouncer.currentPoint][0] < bouncer.xEnd) {
     bouncer.angle = 180 + bouncer.angle;
  }

  if (bouncer.angle < 0) {
    bouncer.angle += 360;
  }  
}

function offsetGet(bouncer) {
  // calculates offset based on a bouncer's angle
  bouncer.xOffset = (1/(1+(tan(bouncer.angle * (3.1412/180)))**2))**(1/2)
  bouncer.yOffset = ((1/(1+(tan(bouncer.angle * (3.1412/180)))**2))**(1/2))*(tan((bouncer.angle * (3.1412/180))))

  if (bouncer.angle > 90 && bouncer.angle <= 180) { 
    bouncer.xOffset = -((1/(1+(tan(bouncer.angle * (3.1412/180)))**2))**(1/2))
    bouncer.yOffset = -((1/(1+(tan(bouncer.angle * (3.1412/180)))**2))**(1/2))*(tan((bouncer.angle * (3.1412/180))))
  }

  else if (bouncer.angle > 180 && bouncer.angle < 270) {
    bouncer.xOffset = -((1/(1+(tan(bouncer.angle * (3.1412/180)))**2))**(1/2))
    bouncer.yOffset = -((1/(1+(tan(bouncer.angle * (3.1412/180)))**2))**(1/2))*(tan((bouncer.angle * (3.1412/180))))
  }
}

function collisionCheck(bouncer) {
  // checks if a bouncer has collided with its current point
  if (((bouncer.xEnd - bouncer.allPoints[bouncer.currentPoint][0])**2 + (bouncer.yEnd - bouncer.allPoints[bouncer.currentPoint][1])**2)**(1/2) < speed) {
    //new position of start line
    bouncer.xStart = bouncer.allPoints[bouncer.currentPoint][0];
    bouncer.yStart = bouncer.allPoints[bouncer.currentPoint][1];
    bouncer.currentPoint += 1;
    
    // gets a new angle
    angleGet(bouncer)
    //calculates offset based on angle
    offsetGet(bouncer)
  }
}

function move(bouncer) {
  // moves a bouncer according to its offset and speed
  bouncer.xEnd += (bouncer.xOffset)*speed
  bouncer.yEnd += (bouncer.yOffset)*speed
}

function drawPoints(bouncer) {
  // draws all points in a bouncer
  for (k = 0; k < (bouncer.allPoints).length; k++) {
    strokeWeight(3);
    circle(bouncer.allPoints[k][0], bouncer.allPoints[k][1], 10);
  }
}

function bouncerState(bouncer) {
  // processes a bouncer's state

  // if bouncer has not started
  if (bouncer.start == 0) {
    strokeWeight(2)
    stroke('white')
    drawPoints(bouncer)
  }
  
  //if bouncer has started
  else {
    move(bouncer)
    lineDraw(bouncer)
    playSound(bouncer.oscillator, bouncer.angle)
    collisionCheck(bouncer)
  }
}

function draw() {
  // your cool abstract sonic artwork code goes in this draw function
  background(0,0,100,6);
  strokeWeight(2)
  stroke('white')
  fill('white')
  textSize(30);
  text('T to release bouncers', textWidth1, textHeight1);
  text('Click and release to add points', textWidth2, textHeight2);
  for (let f = 0; f < bouncers.length; f++) {
    bouncerState(bouncers[f])
  }
}

function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }

  if (key === "t") {
    if (bouncers[numBouncers].allPoints.length > 1) {
      //bouncer initialization
      bouncers[numBouncers].start = 1
      bouncers[numBouncers].xStart = bouncers[numBouncers].allPoints[0][0]
      bouncers[numBouncers].yStart = bouncers[numBouncers].allPoints[0][1]
      bouncers[numBouncers].xEnd = bouncers[numBouncers].allPoints[0][0]
      bouncers[numBouncers].yEnd = bouncers[numBouncers].allPoints[0][1]
      angleGet(bouncers[numBouncers])
      offsetGet(bouncers[numBouncers])
      bouncers[numBouncers].oscillator.start()
  
      //adds another bouncer to the list
      numBouncers += 1
      bouncers.push({
        start: 0,
        allPoints: [],
        currentPoint: 1,
        endOfPoints: 0,
        xOffset: 1,  
        yOffset: 1,
        xEnd: 200,
        yEnd: 500,
        xStart: 200,
        yStart: 500,
        angle: 100,
        oscillator: new p5.Oscillator("triangle")
      })

    }
  }
  
  
}

function mouseClicked() {
  bouncers[numBouncers].allPoints.push([mouseX, mouseY]);
}

