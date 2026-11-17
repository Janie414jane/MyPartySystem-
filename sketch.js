let system;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width / 2, height / 2)); // 중앙에서 시작
}

function draw() {
  background(51);
  system.addParticle(); // 매 프레임 한 마리씩 증식
  system.run();
}