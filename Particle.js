class Particle {
    constructor(position) {
        this.acceleration = createVector(0, 0);
        // 모든 방향으로 천천히 퍼지도록 랜덤 초기 속도
        this.velocity = p5.Vector.random2D().mult(random(0.2, 0.8));
        this.position = position.copy();
        this.lifespan = 255;
    }

    run() {
        this.update();
        this.display();
    }

    update() {
        let center = createVector(width / 2, height / 2);

        // 중심에서 바깥으로 밀어내는 힘 (바이러스가 퍼져나감)
        let away = p5.Vector.sub(this.position, center);
        if (away.mag() > 0) away.normalize().mult(0.015);

        // 물 위의 완만한 흐름 (무리끼리 같이 도는 느낌)
        let swirl = createVector(-away.y, away.x);
        if (swirl.mag() > 0) swirl.normalize().mult(0.02);

        // 물결 요동
        let jitter = p5.Vector.random2D().mult(0.25);

        this.acceleration = p5.Vector.add(away, swirl).add(jitter);

        // 세면대 물 영역(타원) 안에 머물기
        let nx = (this.position.x - width / 2) / 300;
        let ny = (this.position.y - height / 2) / 145;
        if (nx * nx + ny * ny > 1) {
            let back = p5.Vector.sub(center, this.position);
            if (back.mag() > 0) this.acceleration.add(back.normalize().mult(0.12));
        }

        this.velocity.add(this.acceleration);
        this.velocity.mult(0.9); // 물 위라 잘 멈춤
        this.position.add(this.velocity);
        this.lifespan -= 0.4;
    }

    display() {
        stroke(120, 220, 140, this.lifespan * 0.5); // 흐름 꼬리
        strokeWeight(2);
        line(this.position.x - this.velocity.x * 8,
             this.position.y - this.velocity.y * 8,
             this.position.x, this.position.y);
        noStroke();
        fill(120, 220, 140, this.lifespan); // 바이러스 같은 연한 초록색
        ellipse(this.position.x, this.position.y, 6, 6);
    }

    isDead() {
        return this.lifespan < 0;
    }
}



// // A simple Particle class
// let Particle = function(position) {
//   this.acceleration = createVector(0, 0.05);
//   this.velocity = createVector(random(-1, 1), random(-1, 0));
//   this.position = position.copy();
//   this.lifespan = 255;
// };

// Particle.prototype.run = function() {
//   this.update();
//   this.display();
// };

// // Method to update position
// Particle.prototype.update = function(){
//   this.velocity.add(this.acceleration);
//   this.position.add(this.velocity);
//   this.lifespan -= 2;
// };

// // Method to display
// Particle.prototype.display = function() {
//   stroke(200, this.lifespan);
//   strokeWeight(2);
//   fill(127, this.lifespan);
//   ellipse(this.position.x, this.position.y, 12, 12);
// };

// // Is the particle still useful?
// Particle.prototype.isDead = function(){
//   return this.lifespan < 0;
// };
