let system;
let canX = 100;
let canY = 195;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(canX + 135, canY + 10));
}

function draw() {
  background(135, 206, 235);

  // 캔버스 안에서 마우스를 따라 주전자 이동
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    canX = lerp(canX, constrain(mouseX - 45, 0, width - 140), 0.1);
    canY = lerp(canY, constrain(mouseY - 30, 0, height - 60), 0.1);
  }

  // 물은 항상 주둥이에서 나오도록 시작점을 갱신
  system.origin.x = canX + 135;
  system.origin.y = canY + 10;

  drawFlower();
  drawWateringCan(canX, canY);

  system.addParticle();
  // 마우스를 누르는 동안 물방울에 위쪽 힘 추가
  system.run(mouseIsPressed ? createVector(0, -0.3) : null);
}

// 왼쪽 물뿌리개 (x, y = 몸통 왼쪽 위 모서리)
function drawWateringCan(x, y) {
  push();
  noStroke();
  fill(120, 160, 190);
  rect(x, y, 90, 60, 10);                            // 몸통
  fill(90, 130, 165);
  triangle(x + 80, y + 10, x + 140, y + 3, x + 88, y + 27); // 주둥이
  noFill();
  stroke(90, 130, 165);
  strokeWeight(8);
  arc(x + 45, y, 60, 50, PI, TWO_PI);                // 손잡이
  pop();
}

// 오른쪽 꽃
function drawFlower() {
  push();
  noStroke();
  fill(180, 110, 70);
  quad(540, 330, 600, 330, 590, 380, 550, 380);     // 화분

  stroke(70, 160, 80);
  strokeWeight(6);
  line(570, 330, 570, 245);                         // 줄기
  noStroke();
  fill(70, 160, 80);
  ellipse(550, 290, 30, 16);                        // 잎
  ellipse(590, 305, 30, 16);

  fill(240, 120, 160);
  for (let a = 0; a < TWO_PI; a += PI / 3) {        // 꽃잎
    ellipse(570 + cos(a) * 22, 240 + sin(a) * 22, 26, 26);
  }
  fill(255, 210, 80);
  ellipse(570, 240, 24, 24);                        // 꽃 중심
  pop();
}
