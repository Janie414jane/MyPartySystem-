let system, sink;

function setup() {
  createCanvas(720, 400);
  sink = createGraphics(width, height);
  drawSink();
  system = new ParticleSystem(createVector(width / 2, height / 2));
}

function drawSink() {
  // 세면대 상판
  sink.background(32, 35, 38);

  // 분지 테두리
  sink.noStroke();
  sink.fill(125, 132, 136);
  sink.ellipse(width / 2, height / 2, 660, 350);

  // 물
  sink.fill(22, 68, 88);
  sink.ellipse(width / 2, height / 2, 620, 310);

  // 물결 무늬
  sink.noFill();
  sink.stroke(140, 195, 215, 35);
  sink.strokeWeight(2);
  for (let i = 0; i < 4; i++) {
    sink.arc(width / 2 - 150 + i * 90, height / 2 - 70 + i * 35, 200, 45, PI, TWO_PI);
  }

  // 배수구
  sink.noStroke();
  sink.fill(8, 16, 20);
  sink.ellipse(width / 2, height / 2 + 108, 46, 22);
  sink.fill(90, 100, 105);
  sink.ellipse(width / 2, height / 2 + 108, 32, 14);

  // 수전
  sink.fill(160, 166, 168);
  sink.rect(width / 2 - 8, 0, 16, 58, 6);
  sink.rect(width / 2 - 8, 52, 66, 14, 6);
}

function drawFinger() {
  push();
  translate(mouseX, mouseY);
  rotate(-0.25);
  noStroke();
  fill(0, 0, 0, 35);              // 물 위 그림자
  ellipse(5, 12, 50, 100);
  fill(232, 196, 172);            // 손가락
  ellipse(0, 22, 46, 92);
  ellipse(0, -8, 46, 50);         // 손가락 끝
  fill(238, 178, 175);            // 손톱
  ellipse(0, -14, 24, 28);
  pop();
}

function draw() {
  image(sink, 0, 0);
  system.addParticle();
  system.run();
  drawFinger();
}
