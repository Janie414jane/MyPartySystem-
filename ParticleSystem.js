class ParticleSystem {
    constructor(position) {
        this.origin = position.copy();
        this.particles = [];
    }

    addParticle() {
        if (this.particles.length >= 400) return; // 화면에 너무 많아지지 않게 제한
        // 처음엔 중앙에서, 이후엔 기존 세균 근처에서 증식
        let pos = this.origin;
        if (this.particles.length > 0) {
            let parent = random(this.particles);
            pos = p5.Vector.add(parent.position, p5.Vector.random2D().mult(4));
        }
        this.particles.push(new Particle(pos));
    }

    run() {
        for (let i = this.particles.length-1; i >= 0; i--) {
            let p = this.particles[i];
            p.run();
            if (p.isDead()) {
            this.particles.splice(i, 1);
            }
        }
    }

}


// let ParticleSystem = function(position) {
//   this.origin = position.copy();
//   this.particles = [];
// };

// ParticleSystem.prototype.addParticle = function() {
//   this.particles.push(new Particle(this.origin));
// };

// ParticleSystem.prototype.run = function() {
//   for (let i = this.particles.length-1; i >= 0; i--) {
//     let p = this.particles[i];
//     p.run();
//     if (p.isDead()) {
//       this.particles.splice(i, 1);
//     }
//   }
// };