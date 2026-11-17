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
        // 중앙에서 바깥으로 밀어내는 힘 (집단이 퍼져나감)
        let away = p5.Vector.sub(this.position, createVector(width / 2, height / 2));
        if (away.mag() > 0) away.normalize().mult(0.015);
        // 비누 위에서 지그재그로 떨리는 브라운 운동
        let jitter = p5.Vector.random2D().mult(0.25);

        this.acceleration = p5.Vector.add(away, jitter);
        this.velocity.add(this.acceleration);
        this.velocity.mult(0.9); // 마찰 (표면 장력처럼 속도를 낮춤)
        this.position.add(this.velocity);
        this.lifespan -= 0.4;
    }

    display() {
        noStroke();
        fill(120, 220, 140, this.lifespan); // 세균 같은 연한 초록색
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
