class Particle {
    constructor(position) {
        this.acceleration = createVector(0, 0.12);          // 중력으로 물방울이 아래로 떨어짐
        this.velocity = createVector(random(10, 13), random(-2, 0)); // 앞(오른쪽)으로 물이 분사
        this.position = position.copy();
        this.lifespan = 120;
    }

    run() {
        this.update();
        this.display();
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 4;
    }

    display() {
        noStroke();
        fill(80, 170, 255, this.lifespan);                  // 물방울 색
        ellipse(this.position.x, this.position.y, 8, 8);
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
