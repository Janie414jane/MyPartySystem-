class Particle {
    constructor(position, mass = random(0.8, 1.2)) {
        this.mass = mass;
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(random(10, 13), random(-2, 0)); // 앞(오른쪽)으로 물이 분사
        this.position = position.copy();
        this.lifespan = 120;
    }

    applyForce(force) {
        this.acceleration.add(p5.Vector.div(force, this.mass));
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 4;
        this.acceleration.mult(0);
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
