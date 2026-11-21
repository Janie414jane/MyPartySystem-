class ParticleSystem {
    constructor(position) {
        this.origin = position.copy();
        this.particles = [];
    }

    addParticle() {
        this.particles.push(new Particle(this.origin));
    }

    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.applyForce(createVector(0, 0.12)); // 매 프레임 아래 방향 힘 적용
            p.update();
            p.display();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}
