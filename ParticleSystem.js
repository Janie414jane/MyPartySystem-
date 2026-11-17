class ParticleSystem {
    constructor(position) {
        this.origin = position.copy();
        this.particles = [];
    }

    addParticle() {
        if (this.particles.length >= 400) return; // 화면에 너무 많아지지 않게 제한
        // 대부분은 기존 입자 근처에서, 일부는 중심에서 증식 (뭉쳐서 확산)
        let pos = this.origin;
        if (this.particles.length > 0 && random(1) > 0.3) {
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