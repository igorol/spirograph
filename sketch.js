
let t = 0;
let bigSlider, smallSlider, rhoSlider, frSLider, ClearButton;

function setup() {
  c = createCanvas(window.innerWidth, window.innerHeight);
  background(255);

  strokeWeight(1);
  stroke(0);
  textSize(15);

  rhoSlider = createSlider(10, 400, 10, 10);
  rhoSlider.position(20, 20);
  bigSlider = createSlider(1, 400, 100, 1);
  bigSlider.position(20, 40);
  smallSlider = createSlider(10, 600, 20, 1);
  smallSlider.position(20, 60);
  frSLider = createSlider(24, 500, 24, 1);
  frSLider.position(20, 80);

  text('Slider 1 = ' + rhoSlider.value(),
       rhoSlider.x * 2 + rhoSlider.width,
       35);

  text('Slider 2 = ' + bigSlider.value(),
       bigSlider.x * 2 + bigSlider.width,
       55);

  text('Slider 3 = ' + smallSlider.value(),
       smallSlider.x * 2 + smallSlider.width,
       75);

  text('Speed',
       frSLider.x * 2 + frSLider.width,
       95);

  // create clear button
  ClearButton = createButton('Clear');
  ClearButton.position(35, 105);
  ClearButton.mousePressed(clearLines);

  // create save button
  // saveButton = createButton('Save Image');
  // saveButton.position(95, 105);
  // saveButton.mousePressed(saveCanvas(c, 'myCanvas', 'png'));

}

function draw() {

  translate(displayWidth/2,displayHeight/2);
  noFill();
  r = smallSlider.value();
  R = bigSlider.value();
  rho = rhoSlider.value();
  fr = frSLider.value();
  frameRate(fr);

  delta = 0.02;
  if (t == 0) {
    ref_rho = rho;
    ref_r = r;
    ref_R = R;
    ref_fr = fr;
  }
  else {
    // logic for drawing lines
    x = (R - r)*cos(t) + rho*cos(((R-r)/r)*t);
    y = (R - r)*sin(t) - rho*sin(((R-r)/r)*t);
    past_x = (R - r)*cos(t-delta) + rho*cos(((R-r)/r)*(t-delta));
    past_y = (R - r)*sin(t-delta) - rho*sin(((R-r)/r)*(t-delta));
    stroke(x, y, 121);
    strokeWeight(2);
    line(past_x, past_y, x, y);
      //
      if (rhoSlider.value() != ref_rho | smallSlider.value() != ref_r | bigSlider.value() != ref_R)
      {
        clearLines();
      }
  }

  t += delta;
}


function clearLines()
{
  clear();
  t = 0;
  strokeWeight(1);
  stroke(0);
  textSize(15);
  text('Slider 1 = ' + rhoSlider.value(),
       rhoSlider.x * 2 + rhoSlider.width - displayWidth/2,
       35 - displayHeight/2);

  text('Slider 2 = ' + bigSlider.value(),
       bigSlider.x * 2 + bigSlider.width - displayWidth/2,
       55 - displayHeight/2);

  text('Slider 3 = ' + smallSlider.value(),
      smallSlider.x * 2 + smallSlider.width - displayWidth/2,
      75 - displayHeight/2);
  text('Speed', frSLider.x * 2 + frSLider.width - displayWidth/2,
        95 - displayHeight/2);

  draw();
}
