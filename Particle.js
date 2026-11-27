// 트리 표면을 구성하는 3차원 문자 입자
class Particle {
    constructor(position, character, color, light = false) {
        this.position = position.copy();
        this.character = character;
        this.color = color;
        this.light = light;
        this.phase = random(TWO_PI);
    }

    project(rotation) {
        const x = this.position.x * cos(rotation) + this.position.z * sin(rotation);
        const z = -this.position.x * sin(rotation) + this.position.z * cos(rotation);
        const scale = 1000 / (1000 - z);
        return { x: x * scale, y: this.position.y, z };
    }

    display(x, y, time, depth) {
        const brightness = map(depth, -280, 280, 0.65, 1, true) * (0.9 + 0.1 * sin(time * 2.5 + this.phase));
        fill(...this.color.map(value => value * brightness));
        drawingContext.shadowColor = `rgb(${this.color.join(',')})`;
        drawingContext.shadowBlur = this.light ? 7 : 0;
        text(this.character, x, y);
    }
}
