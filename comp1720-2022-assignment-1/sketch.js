function setup() {
  // create the canvas (800px wide, 800px high)
  createCanvas(800, 800);

  // draw a border to help you see the size
  // this isn't compulsory (remove this code if you like)
  strokeWeight(4);
  rect(0, 0, width, height);
}

function draw() {
  // your cool monster code goes in this draw function
  background(255);
  push();
  translate(20, 30);

  fill(0, 0, 0);
  triangle(375, 100, 340, 220, 450, 220);
  
  fill(150,0,0);
  triangle(340, 220, 450, 220, 377, 650);

  quad(344, 170, 270, 310, 226, 600, 377 ,650);
  quad(340, 120, 320, 200, 350, 220, 375 ,100);
  quad(320, 200, 250, 240, 260, 310, 310, 290);
  quad(260, 310, 310, 290, 330, 320, 280, 400);
  quad(330, 320, 377, 320, 377, 430, 280, 400);


  translate(755 ,0);
  scale(-1, 1);
  quad(344, 170, 270, 310, 220, 600, 377 ,650);
  quad(320, 200, 250, 240, 260, 310, 310, 290);
  quad(340, 120, 320, 200, 350, 220, 375 ,100);
  quad(260, 310, 310, 290, 330, 320, 280, 400);
  quad(330, 320, 377, 320, 377, 430, 280, 400);

  pop();
  circle(385,200,10) 
  circle(410,200,10) 

  //centers all shapes
  translate(width/2, height/2);

  //rotates all shapes 
  rotate(frameCount/60.0);

  for(var i=0; i<8; i++) {
  ellipse(60, 300, 20,70);
  triangle(70, 320, 50, 320, 60, 500);
  rect(30,320,60,10)
  rotate(radians(90/2));
  }
}

// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "monster.png" file) to your downloads folder
function keyTyped() {
  if (key === " ") {
    saveCanvas("monster.png");
  }
}
