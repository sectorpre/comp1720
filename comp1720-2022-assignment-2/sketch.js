let inputReceive = 0
let weights = []
let taggedHex = []
let offset = 0
let wepFiring = -1
let blackBox = -400
let wepFiringSnap = 0
let coreSnap = 0
let currentTarget = 0
let currentWeapon = "MOUNTED TURRET";


function setup() {
  // create the canvas (1200px wide, 800px high)
  createCanvas(1200, 800);

  // draw a border to help you see the size
  // this isn't compulsory (remove this code if you like)
  strokeWeight(5);
  rect(0, 0, width, height);
}

function visualInput() {
  if (inputReceive) {
    strokeWeight(2);
    stroke(255,0,50);
    noFill();
    rect((width/2)+10, height/2 + 320, 400, 50);
    textSize(20);
    fill(255,0,50)
    text('WEAPONS SYSTEMS ONLINE',(width/2)+60, (height/2)+350)
  }
  else {
    strokeWeight(2);
    stroke(50,100,255);
    noFill();
    rect((width/2)+10, height/2 + 320, 400, 50);
    textSize(20);
    fill(50,100,255)
    text('WEAPONS SYSTEMS OFFLINE',(width/2)+60, (height/2)+350)
  }
}

function visualInstructions(posx, posy, size) {
  textSize(size);
  fill('orange');
  strokeWeight(1);
  text('OPERATIONAL INSTRUCTIONS',posx, posy);
  text('WEAPONS SYSTEMS INITIALIZATION - ENTER',posx, posy+11);
  text('WEAPON SELECTION - 1, 2, 3',posx, posy+22);
  text('VIEW ROTATION LEFT - A',posx, posy+33);
  text('VIEW ROTATION RIGHT - D',posx + size*23, posy+11);
  text('ENGAGE TARGET - F',posx + size*23, posy+22);

}

function visualHexagon(posx, posy,size) {
  strokeWeight(0);
  //fill('red')
  quad(posx - size, posy - size/2, posx, posy, posx + size ,posy - size/2)
  rect(posx-size, posy-(1.5*size), size*2, size)
  quad(posx - size, posy - size/2 - size, posx, posy - size*2, posx + size ,posy - size/2 - size)
}

function visualCore(posx, posy, size) {
  //static elements
  strokeWeight(2);
  stroke('orange')
  fill('orange')
  textSize(size);
  text('NUCLEAR OUTPUT SCALE',posx-2*size, posy-size*3);
  noFill();
  rect(posx-2.5*size,posy-size*4.1,size*14,size*1.5)
  rect(posx+size*8,size*18,size*0.4,size*2)
  rect(posx+size*8.6,size*17,size*0.4,size*2)
  rect(posx+size*9.2,size*18,size*0.4,size*2)
  rect(posx+size*9.8,size*17,size*0.4,size*2)

  strokeWeight(1);
  stroke('orange')
  fill('orange')
  textSize(size*1.4/3);
  text('EXTERNAL REACTOR',posx+size*7.5, posy-size*0.5);
  text('DEADFALL REACT',posx+size*8.5, posy+size);
  text('INNER REACTOR',posx+size*9.5, posy+size*2.5);
  text('CENTRAL REACTOR',posx+size*10, posy+size*4);
  text('AVG: 0.5557',posx+size*10.5, size*17.5);
  text('HIGH: 2.3334',posx+size*10.5, size*18);
  //text('LCL PURITY',posx+size*9.5, posy+size*10);
  
  if (frameCount % 20 > 10) {
    stroke(255,0,50);
    fill(0,0,0);
    rect(posx-size*4.8,  posy+size*11.4, size*4,size);
  
    strokeWeight(1);
    fill(255,0,50)
    textSize(size/2);
    text('CORE ACTIVE',posx-size*4.5, posy+size*12);
  };

  currentHex = 0;

  if ((frameCount - coreSnap) == 50) {
    taggedHex = []
    maxHex = 1
    if (currentWeapon == "PREDATOR-CLASS VAPORIZER V-7") {
      maxHex = 20
    }
    else if (currentWeapon == "K9 SHORT-RANGE MISSILE") {
      maxHex = 5
    }
    for (k = 0; k < maxHex; k ++) {
      taggedHex.push(random(1,30))
    } 
    coreSnap = frameCount;
  };

  for (i = 3; i < 7; i++) {
    //text(taggedHex.length,posx-size*4.5, posy+size*12);
    for (k = 0; k < i; k++) {
      fill(100,255,100);
      currentHex += 1
      for (n = 0; n < taggedHex.length; n ++) {
        if ((taggedHex[n])+1 > currentHex && currentHex > (taggedHex[n])-1) {
          fill(255,0,50);
          break;
        }
      } 
      visualHexagon((posx-((i-3)*1.1*size) + (k*2.2*size)), posy+((i-3)*size*1.7), 20)

      fill(100,255,100);
      currentHex += 1
      for (n = 0; n < taggedHex.length; n ++) {
        if ((taggedHex[n])+1 > currentHex && currentHex > (taggedHex[n])-1) {
          fill(255,0,50);
          break;
        }
      } 
      visualHexagon((posx-((i-3)*1.1*size) + (k*2.2*size)), posy+((6-(i-3))*size*1.7), 20)
    };
  };
  



}

function visualPulse(posx, posy, size, weights) {
  // static elements
  strokeWeight(4);
  stroke('orange');
  line(posx, posy, posx + size, posy);
  strokeWeight(1);
  fill('orange')
  textSize(size/30);
  text('VAPORIZER CHARGE INDICATOR',posx, posy-size/50);
  text('ELAPSED TIME: '+ frameCount ,posx+3*size/5, posy-size/50);

  stroke('red')
  fill(255,0,50)
  textSize(size/40);

  for (k = 0; k < 3; k++) {
    text('CMBR.',posx, posy+(size/13)+k*(size/10)+k*(size/18))  
  }
  strokeWeight(2);
  textSize(size/15);

  for (k = 0; k < 3; k++) {
    text('0'+k,posx, posy+(size/7)+k*(size/10)+k*(size/18))  
  }

  //dynamic elements
  strokeWeight(0);
  fill(0,0,255)

  for (k = 0; k < 3; k ++) {
    if (frameCount % 10 == 0) {
      if (currentWeapon == "PREDATOR-CLASS VAPORIZER V-7") {
        weights[k] = randomGaussian(20, 1);
        //weights[k] = randomGaussian(14, 1);
      }

      else {
        weights[k] = randomGaussian(14, 1);
      }
    }
    for (i = 0; i < weights[k]; i ++) {
      fill(0,0,255)
      if (i > 10) {
        fill(100,0,255)
      };
      if (i > 15){
        fill(255,50,255)
      };
      rect(posx + i * size/36 + i * size/72 + size/10 , posy + size/20 + k * (size/18) + k*(size/10), size/36, size/10);
    };
  };

}

function visualGraph(posx, posy,size) {
  //static elements
  strokeWeight(4);
  stroke('orange');
  line(posx, posy, posx, posy+size);
  line(posx, posy + size, posx+size*1.7, posy + size);

  strokeWeight(1);
  fill('orange')
  textSize(size/20);
  text('INTERNAL TEMPERATURE',posx + size*0.5, posy+(size*1.1));

  strokeWeight(2);
  line(posx+10, posy, posx+10, posy+size);

  //dynamic elements
  noFill();
  if (frameCount % 2 == 0){
    startY = posy+size;
    for  (i = 0; i < 5; i ++) {
      endY =  posy*(random(7,8)/7.5)+i*size*0.1+(size/2.1);
      if (currentWeapon == "PREDATOR-CLASS VAPORIZER V-7") {
        endY =  posy*(random(6,7)/7.5)+i*size*0.1+(size/2.4);
      }
      else if (currentWeapon == "MOUNTED TURRET") {
        endY = endY =  posy*(random(1,2)/7)+i*size*0.1+(size/2.2) + 1.7*size;
      }

      
      if (i == 4) {
        endY = posy*1.5
      }
      if (currentWeapon == "MOUNTED TURRET") {
        bezier((posx)+(i*size)/3, startY, posx + (size*random(9,9))/36 + i*size/3,posy*1.5, posx + (size*random(9,10))/36 + i*size/3, posy*1.5, posx+(i*size)/3+size/3, endY); 
      }
      else {
        bezier((posx)+(i*size)/3, startY, posx + (size*random(2,9))/36 + i*size/3,posy*(1+(0.1*i)), posx + (size*random(3,15))/36 + i*size/3, posy*1.5, posx+(i*size)/3+size/3, endY);
    }
      startY = endY;
    }
    
  }

  stroke(100,255,100);
  for (i = 1; i < 5; i ++) {
    line(posx + i*size/3, posy, posx + i*size/3, posy+size);
  }

  for (i = 0; i < 4; i ++) {
    for (k = 0; k < 5; k ++) {
      line(posx + ((size*k*2))/6 + size/6, posy+(i*(3)) *size/10, posx + ((size*k*2))/6 + size/6, posy+((i*(3)+0.5)*size/10));
      line(posx + ((size*k*2))/6 + size*0.90/6, posy+((i*(3)+0.25)*size/10), posx + ((size*k*2))/6 + size*1.10/6, posy+((i*(3)+0.25)*size/10));
    }
  };
}

function visualMap(posx, posy, size) {
    //currently firing
  if (wepFiring == 1) {
    if (currentWeapon == "MOUNTED TURRET") { 
      strokeWeight(6);
      stroke(50,50,255);
      noFill();
      bezier(posx, posy + 3*0.7*size/4, posx + 1*size/6, posy + 2*0.7*size/4, posx + 2*size/6, posy+0.7*1*size/6, posx + size/2, posy+0.7*2*size/5);
      push();
      translate(1610,0);
      scale(-1, 1);
      bezier(posx, posy + 3*0.7*size/4, posx + 1*size/6, posy + 2*0.7*size/4, posx + 2*size/6, posy+0.7*1*size/6, posx + size/2, posy+0.7*2*size/5);
      pop();
    }

    else if (currentWeapon == "PREDATOR-CLASS VAPORIZER V-7") {
      strokeWeight(6);
      stroke(50,50,255);
      noFill();
      line(posx+1*size/7, posy+0.7*size, posx+(size/2),  posy+0.7*2*size/5);
      line(posx+2*size/7, posy+0.7*size, posx+(size/2),  posy+0.7*2*size/5);
      line(posx+2*size/9, posy+0.7*size, posx+(size/2),  posy+0.7*2*size/5);
      push();
      translate(1610,0);
      scale(-1, 1);
      line(posx+1*size/7, posy+0.7*size, posx+(size/2),  posy+0.7*2*size/5);
      line(posx+2*size/7, posy+0.7*size, posx+(size/2),  posy+0.7*2*size/5);
      line(posx+2*size/9, posy+0.7*size, posx+(size/2),  posy+0.7*2*size/5);
      pop();
    }

    else if (currentWeapon = "K9 SHORT-RANGE MISSILE") {
      strokeWeight(6);
      stroke(50,50,255);
      noFill();
      bezier(posx, posy + 1*0.2*size/4, posx + 1*size/6, posy + 2*0.7*size/4, posx + 2*size/6, posy+0.7*1*size/6, posx + size/2, posy+0.7*2*size/5);
      bezier(posx, posy + 4*0.2*size/4, posx + 2*size/6, posy + 1*0.1*size/6, posx + 2*size/6, posy+0.7*1*size/6, posx + size/2, posy+0.7*2*size/5);
      bezier(posx, posy + 6*0.2*size/4, posx + 1*size/6, posy + 3*0.7*size/4, posx + 2*size/6, posy+0.7*1*size/6, posx + size/2, posy+0.7*2*size/5);
      push();
      translate(1610,0);
      scale(-1, 1);
      bezier(posx, posy + 3*0.7*size/4, posx + 1*size/6, posy + 2*0.7*size/4, posx + 2*size/6, posy+0.7*1*size/6, posx + size/2, posy+0.7*2*size/5);
      bezier(posx, posy + 3*0.1*size/4, posx + 2*size/6, posy + 1*0.7*size/7, posx + 1*size/6, posy+0.1*8*size/6, posx + size/2, posy+0.7*2*size/5);  
      bezier(posx, posy + 5*0.2*size/4, posx + 1*size/6, posy + 4*0.7*size/4, posx + 2*size/6, posy+0.7*1*size/6, posx + size/2, posy+0.7*2*size/5);
      pop();

    }

    fill(0,0,0);
    stroke(0,0,0);
    rect(posx+1*size/2,  posy , blackBox, size)
    rect(posx+1*size/2,  posy , -blackBox, size)

    if (frameCount % 1 == 0) {
      blackBox += 5
      if (blackBox == 0) {
        blackBox = -400;
        inputReceive = 3;
        wepFiring = 2;
        wepFiringSnap = frameCount;
      }
    }
  } 
  // initialization
  else if (wepFiring == -1) {
    currentTarget = posx+size/2;
    wepFiring = 0;
  }

  // finished firing
  else if (wepFiring == 2) {
    if ((frameCount - wepFiringSnap) > 100) {
      wepFiring = 0;
      inputReceive = 1;
      currentTarget = posx + (random(0.5,5.5)*size/6);
    }
    fill(50,50,255);
    circle(posx+size/2, posy+0.7*2*size/5, size/25);

    strokeWeight(1);
    stroke(255,0,50)
    fill(255,0,50);
    textSize(10);
    text("RANGE OF FAILURE:" + ((posx + size/2) - (currentTarget-offset)), posx + 3*size/5, 340);
    text("FIGURE 11 TARGET GENERATING IN: " + ((100 - (frameCount - wepFiringSnap))/10), posx + 3*size/5, 350);
    
  }

  strokeWeight(1);
  stroke(255,0,50)
  fill(255,0,50);
  textSize(10);
  text("GENERIC WEAPONS FIRING TEST RESULTS", posx + 3*size/5, 300);
  text("LAST INTERVAL: " + wepFiringSnap, posx + 3*size/5, 320);
  text("PILOT: USER_UNDEFINED", posx + 3*size/5, 310);
  text("WEAPON:" + currentWeapon, posx + 3*size/5, 330);


  //target generation
  if (frameCount % 20 > 5) {
    strokeWeight(2);
    stroke(100,255,100);
    fill(100,255,100);
    currentTarget -= offset;
    circle(currentTarget, posy+0.7*2*size/5, size/25);
    offset = 0;
  }

  //static elements
  noFill();
  strokeWeight(3);
  stroke("orange");
  rect(posx, posy, size, 0.7*size);

  textSize(10);
  strokeWeight(1);
  for (k = 0; k < 6; k ++) {
    text(k*10, posx + size*k*1/6 + size/60, 400);
  }
  for (k = 1; k < 6; k ++) {
    line(posx + k*size/6, posy, posx + k*size/6, posy+0.7*size);
  }
  for (k = 0; k < 7; k ++) {
    line(posx + k*size/6, posy+0.7*size, posx + 3*size/6, posy*2);
  }
  line(posx, posy*2, posx + size, posy*2);
  line(posx, posy*2 - 50, posx + size, posy*2 - 50);

}

function visualWeapon(posx, posy, size){
  //rect(posx, posy, size, size*0.5);
  if (currentWeapon == "MOUNTED TURRET") {
    push();
    strokeWeight(4)
    scale(0.95,0.95);
    translate(20,10);
    noFill();
    triangle(posx+size/4, posy+size/7, posx+size/4+0.99*size/5, posy+size/7, posx+size/4+size/10, posy*0.4)
    strokeWeight(2)
    line(posx+size*1.1/4,posy+size/10,posx+size*0.9/4+size/5,posy+size/10)
    
    fill(0,0,0)
    strokeWeight(4)
    rect(posx+size/4, posy+size/7, size/5,size/3);

    strokeWeight(2);
    for (k = 0; k < 13; k++) {
      line(posx+size/4+size*k/60, posy+6*size/15,posx+size/4+k*size/60, posy+6.5*size/15);
    }
    pop();

    strokeWeight(1);
    textSize(10);
    fill('orange');
    text('FUZE',posx+150, posy+10);
    text('DRIVING BAND',posx+150, posy+130);
    text('HIGH FRAGMENTATION',posx-80, posy+70);
    text('STEEL WARHEAD BODY',posx-80, posy+80);
  }
  else if (currentWeapon == "PREDATOR-CLASS VAPORIZER V-7") {
    push();
    scale(0.9,0.9);
    translate(50,0);
    noFill();
    strokeWeight(3)
    rect(posx+size/4, posy+size/10, size/5,size/3);
    rect(posx+0.9*size/4, posy-size/100, 1.0001*size/4,size/10);
    rect(posx+0.9*size/4, posy + size/3+size/10, 1.0001*size/4,size/10);

    stroke(10,250,255)
    fill(0,0,255)
    circle(posx+size/4+size/10, posy+size/10 + size/6,size/7)
    stroke('orange')
    strokeWeight(1)
    line(posx+size/4+size/10, posy+size/10, posx+size/4+size/10, posy+size/10+size/3)
    for (k = 0; k < 13; k++) {
      line(posx+size/4+size*k/60, posy+8*size/15,posx+size/4+k*size/60, posy+6.5*size/15);
      line(posx+size/4+size*k/60, posy+size/10,posx+size/4+k*size/60, posy);
    }
    pop();

    strokeWeight(1);
    textSize(10);
    fill('orange');
    text('REINFORCED LATCH',posx+140, posy+10);
    text('URANIUM CHARGE',posx+140, posy+90);
    text('FIBREGLASS SHELL',posx-80, posy+50);
    
  }
  else if (currentWeapon == "K9 SHORT-RANGE MISSILE") {
    push();
    scale(0.95,0.95);
    translate(20,10);
    noFill();
    strokeWeight(3)
    rect(posx+size*1.15/4, posy+size/12, size/8,size*1.1/3);
    triangle(posx+size*1.1/4, posy+size/8, posx+size/5+1.1*size/5, posy+size/8, posx+size/4+size/10, posy*0.4);
    triangle(posx+size*1.15/4, posy+size/4,posx+size*1.15/4,posy+size/12+size*1.1/3,posx+size/5, posy+size/13+size*1.13/3);
    push();
    translate(1310,0);
    scale(-1, 1);
    triangle(posx+size*1.15/4, posy+size/4,posx+size*1.15/4,posy+size/12+size*1.1/3,posx+size/5, posy+size/13+size*1.13/3);
    pop();
    pop();

    textSize(10);
    strokeWeight(1);
    fill('orange');
    text('HIGH PRECISION GCG',posx-50, posy+10);
    text('ALCOHOL FUEL TANK',posx+140, posy+90);
    text('WARHEAD',posx+140, posy+40);
    text('FINS',posx, posy+120);
  }

}

function draw() {
  // your cool workstation code goes in this draw function
  background(0,0,0)
  visualGraph(50,450, 230)

  visualPulse(850, 40, 300, weights)
  visualCore(120,160,20);
  visualMap(480,230,650)
  visualWeapon(550, 40, 300)

  visualInstructions(10,735,12)
  visualInput()
} 

// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "thumbnail.png" file) to your downloads folder
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
}

function keyPressed() {
  if (inputReceive == 0) {
    if (keyCode === ENTER) {
      inputReceive = 1;
    }

  } else if (inputReceive == 1) {
    if (keyCode === ENTER) {
      inputReceive = 0;
    }

    // a
    else if (keyCode === 65) {
      offset = -10;
    }

    //d
    else if (keyCode === 68) {
      offset = 10;
    }

    //1
    else if (keyCode === 49) {
      currentWeapon = "MOUNTED TURRET";
    }
    //2
    else if (keyCode === 50) {
      currentWeapon = "PREDATOR-CLASS VAPORIZER V-7";
    }
    //3
    else if (keyCode === 51) {
      currentWeapon = "K9 SHORT-RANGE MISSILE";
    }
    //f
    else if (keyCode === 70) {
      inputReceive = 2;
      wepFiring = 1;
    }
  };
}
