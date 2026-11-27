class ParticleSystem {
    constructor(position) {
        this.origin = position.copy();
        this.home = position.copy();
        this.velocity = 0;
        this.attractorX = position.x;
        this.repellerX = position.x;
        this.attraction = 0;
        this.repulsion = 0;
        this.particles = [];
        this.lightCount = 0;
        const colors = [[255, 222, 88], [255, 87, 106], [98, 218, 255], [225, 119, 255]];
        // 높이별 원형 입자 배치로 원뿔을 만듭니다.
        for (let row = 0; row < 65; row++) {
            const progress = row / 64;
            const branch = sin(progress * PI * 8) * 9 * progress;
            const radius = 5 + progress * 270 + branch;
            const count = max(6, floor(TWO_PI * radius / 6));
            for (let i = 0; i < count; i++) {
                const angle = i / count * TWO_PI + row * 0.13;
                const light = random() < 0.015;
                let color = sin(progress * 29 - angle * 2) > 0.72 ? colors[floor(progress * 7) % colors.length] : [104, 231, 151];
                if (progress > 0.83 && sin(angle * 3 + progress * 12) > -0.25) {
                    color = colors[sin(angle) > 0 ? 1 : 3];
                }
                if (light) { color = random(colors); this.lightCount++; }
                this.particles.push(new Particle(
                    createVector(cos(angle) * radius, -315 + progress * 650, sin(angle) * radius),
                    random((light ? '*+o' : 'W@0&#%*+X').split('')), color, light
                ));
            }
        }
        for (let row = 0; row < 6; row++) {
            for (let i = 0; i < 14; i++) {
                const angle = i / 14 * TWO_PI;
                this.particles.push(new Particle(createVector(cos(angle) * 25, 345 + row * 11, sin(angle) * 25), '#', [211, 153, 245]));
            }
        }
    }

    updateMotion(input, dt) {
        // Attractor: 목표 지점으로 향하는 스프링 힘 F = k(target - x).
        this.attractorX = this.home.x + input * 85;
        // Repeller: 입력 반대쪽에 배치. 거리 제곱에 반비례하는 반발력.
        this.repellerX = this.home.x - Math.sign(input) * 180;
        // 작은 고정 간격으로 적분하여 프레임 속도에 관계없이 안정적으로 움직입니다.
        let remaining = dt;
        while (remaining > 0) {
            const step = Math.min(remaining, 1 / 120);
            this.attraction = (this.attractorX - this.origin.x) * 16;
            const distance = this.origin.x - this.repellerX;
            this.repulsion = Math.sign(distance) * Math.abs(input) * 1800000 / (distance * distance + 3600);
            const acceleration = this.attraction + this.repulsion - this.velocity * 6;
            this.velocity += acceleration * step;
            this.origin.x += this.velocity * step;
            // 화면 밖으로 나가지 않도록 이동 범위를 제한합니다.
            if (Math.abs(this.origin.x - this.home.x) > 100) {
                this.origin.x = this.home.x + Math.sign(this.origin.x - this.home.x) * 100;
                this.velocity = 0;
            }
            remaining -= step;
        }
    }

    run(time, rotation) {
        // 문자 셀마다 가장 가까운 입자만 표시합니다.
        const cells = new Map();
        for (const particle of this.particles) {
            const point = particle.project(rotation);
            const col = round(point.x * 0.76 / 9);
            const row = round(point.y / 12);
            const key = `${col},${row}`;
            if (!cells.has(key) || point.z > cells.get(key).point.z) {
                cells.set(key, { particle, point, col, row });
            }
        }
        textSize(12);
        for (const { particle, point, col, row } of cells.values()) {
            particle.display(this.origin.x + col * 9, this.origin.y + row * 12, time, point.z);
        }
        drawingContext.shadowBlur = 0;
        this.visibleCount = cells.size;
    }
}
