let status = false;
let video;
let model;
let objects = [];

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.center();

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  model = ml5.objectDetector('cocossd', modelLoaded);
}

function start() {
  document.getElementById('modelStatus').innerText = 'Status: Detecting Objects';

  const objectName = document.getElementById('objectInput').value;
  // Use objectName variable for further processing
}

function modelLoaded() {
  console.log('Model loaded');
  status = true;
  model.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  objects = results;
  model.detect(video, gotResult);
}

function draw() {
  image(video, 0, 0, 640, 480);

  if (status) {
    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      const confidence = Math.floor(object.confidence * 100);
      const label = object.label;

      const x = object.x;
      const y = object.y;
      const w = object.width;
      const h = object.height;

      // Draw rectangle
      stroke(0, 255, 0);
      strokeWeight(2);
      noFill();
      rect(x, y, w, h);

      // Draw label and confidence
      strokeWeight(1);
      fill(255, 0, 0);
      textSize(18);
      text(label + ': ' + confidence + '%', x + 5, y + 20);
    }
  }
}
