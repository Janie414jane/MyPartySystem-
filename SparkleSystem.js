// 트리의 이동을 뒤따르는 반짝이: 스프링 추적 + 관성 + 수명에 따른 잔광
class SparkleSystem {
    constructor() {
        this.particles = [];
        this.emission = 0;
        this.palette = [[255, 221, 113], [133, 255, 196], [255, 154, 217], [157, 218, 255]];
    }

    emit(tree, initial = false) {
        const height = random(0.05, 0.98);
        const side = random() < 0.5 ? -1 : 1;
        const offsetX = side * (height * 220 + random(12, 48));
        const offsetY = -315 + height * 650;
        const life = random(1.4, 2.8);
        this.particles.push({
            x: tree.origin.x + offsetX,
            y: tree.origin.y + offsetY,
            offsetX, offsetY,
            vx: -tree.velocity * 0.22 + side * random(5, 22),
            vy: random(-20, -6),
            phase: random(TWO_PI),
            color: random(this.palette),
            size: random(1.5, 3.4),
            age: initial ? random(life * 0.7) : 0,
            life,
            trail: []
        });
    }

    update(tree, time, dt) {
        if (dt <= 0) return;
        const speed = min(abs(tree.velocity) / 170, 1);
        this.emission += (16 + speed * 65) * dt;
        while (this.emission >= 1) {
            if (this.particles.length < 140) this.emit(tree);
            this.emission--;
        }
        for (const particle of this.particles) {
            particle.age += dt;
            // 목표 위치도 흔들어 정지 중에는 트리 주변을 천천히 떠다닙니다.
            const targetX = tree.origin.x + particle.offsetX + sin(time * 1.5 + particle.phase) * 15;
            const targetY = tree.origin.y + particle.offsetY - particle.age * 15;
            let remaining = dt;
            while (remaining > 0) {
                const step = min(remaining, 1 / 120);
                particle.vx += ((targetX - particle.x) * 5 - particle.vx * 2.8) * step;
                particle.vy += ((targetY - particle.y) * 3 - particle.vy * 2) * step;
                particle.x += particle.vx * step;
                particle.y += particle.vy * step;
                remaining -= step;
            }
            particle.trail.push({ x: particle.x, y: particle.y, time });
            particle.trail = particle.trail.filter(point => time - point.time < 0.22);
        }
        this.particles = this.particles.filter(particle => particle.age < particle.life);
    }

    display(time) {
        push();
        // 배경의 상태 표시와 인사말 영역에는 반짝이가 겹치지 않게 합니다.
        drawingContext.save();
        drawingContext.beginPath();
        drawingContext.rect(10, 145, 700, 680);
        drawingContext.clip();
        drawingContext.shadowBlur = 0;
        for (const particle of this.particles) {
            const fade = min(particle.age / 0.15, 1) * pow(1 - particle.age / particle.life, 0.7);
            const twinkle = 0.55 + 0.45 * pow(sin(time * 5 + particle.phase), 2);
            const alpha = 230 * fade * twinkle;
            const [r, g, b] = particle.color;
            strokeWeight(1);
            for (let i = 1; i < particle.trail.length; i++) {
                const previous = particle.trail[i - 1];
                const point = particle.trail[i];
                stroke(r, g, b, alpha * 0.35 * i / particle.trail.length);
                line(previous.x, previous.y, point.x, point.y);
            }
            noStroke();
            fill(r, g, b, alpha * 0.08);
            circle(particle.x, particle.y, particle.size * 7);
            fill(r, g, b, alpha * 0.2);
            circle(particle.x, particle.y, particle.size * 3);
            stroke(r, g, b, alpha);
            const radius = particle.size * (0.8 + twinkle);
            line(particle.x - radius, particle.y, particle.x + radius, particle.y);
            line(particle.x, particle.y - radius, particle.x, particle.y + radius);
            noStroke();
            fill(255, 250, 226, alpha);
            circle(particle.x, particle.y, particle.size);
        }
        drawingContext.restore();
        pop();
    }
}
