class ParticleSystem {
    constructor(position) {
        this.origin = position.copy();
        this.particles = [];
        this.gravity = createVector(0, 0.12);
    }

    addParticle() {
        this.particles.push(new Particle(this.origin));
    }

    run(extraForce) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.applyForce(this.gravity);
            if (extraForce) {
                p.applyForce(extraForce);
            }
            p.update();
            p.display();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}
