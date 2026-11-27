const GREET = 'MERRY CHRISTMAS 2026';
const SPIN = 0.35; // rad per second
let system;
let snow = [];
let elapsed = 0;
let paused = false;
let joystick = 0;

function setup() {
    const canvas = createCanvas(720, 900);
    canvas.parent('tree-canvas');
    canvas.attribute('role', 'img');
    canvas.attribute('aria-label', '색색의 문자와 전구로 만든 회전하는 크리스마스트리');
    pixelDensity(min(window.devicePixelRatio || 1, 2));
    frameRate(30);
    textFont('monospace');
    textAlign(CENTER, CENTER);
    system = new ParticleSystem(createVector(360, 405));
    for (let i = 0; i < 150; i++) {
        snow.push({ x: random(width), y: random(height), speed: random(3, 14), phase: random(TWO_PI), size: random(8, 15) });
    }
    paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('toggle-motion').addEventListener('click', () => {
        paused = !paused;
        updatePlayback();
    });
    updatePlayback();
    setupJoystick();
}

function setupJoystick() {
    const stick = document.getElementById('joystick');
    const reset = () => {
        stick.value = 0;
        joystick = 0;
        stick.setAttribute('aria-valuetext', '중앙');
    };
    stick.addEventListener('input', () => {
        joystick = Number(stick.value) / 100;
        stick.setAttribute('aria-valuetext', joystick === 0 ? '중앙' : `${joystick < 0 ? '왼쪽' : '오른쪽'} ${Math.abs(Number(stick.value))}%`);
    });
    // 범위 입력의 기본 드래그와 키보드 조작을 사용합니다.
    window.addEventListener('pointerup', reset);
    window.addEventListener('pointercancel', reset);
    window.addEventListener('blur', reset);
    stick.addEventListener('blur', reset);
    stick.addEventListener('keyup', reset);
}

function updatePlayback() {
    document.getElementById('toggle-motion').textContent = paused ? '▶ 재생' : 'Ⅱ 일시정지';
    document.getElementById('toggle-motion').setAttribute('aria-pressed', String(paused));
    document.getElementById('playback-state').textContent = paused ? 'paused' : 'running';
    document.getElementById('joystick').disabled = paused;
    if (paused) {
        joystick = 0;
        document.getElementById('joystick').value = 0;
    }
}

function draw() {
    const dt = paused ? 0 : min(deltaTime / 1000, 0.1);
    elapsed += dt;
    background(13, 20, 40);
    noStroke();
    for (const flake of snow) {
        flake.y = (flake.y + flake.speed * dt) % height;
        fill(150, 172, 218, 65 + 55 * sin(elapsed + flake.phase));
        textSize(flake.size);
        text(flake.size > 12 ? '*' : '·', flake.x + sin(elapsed * 0.25 + flake.phase) * 6, flake.y);
    }
    system.updateMotion(joystick, dt);
    drawForces();
    system.run(elapsed, elapsed * SPIN);
    drawStar();
    drawOverlay();
    if (frameCount % 5 === 0) {
        document.getElementById('fps').textContent = `${round(frameRate())} fps`;
        document.getElementById('force-readout').textContent = `x ${(system.origin.x - system.home.x).toFixed(0)}`;
    }
}

function drawForces() {
    if (Math.abs(joystick) < 0.01) return;
    push();
    textSize(12);
    textAlign(CENTER, CENTER);
    const markers = [
        { x: system.attractorX, color: '#6cdbff' },
        { x: system.repellerX, color: '#ff789b' }
    ];
    for (const marker of markers) {
        stroke(marker.color);
        strokeWeight(1);
        noFill();
        circle(marker.x, 805, 20 + sin(elapsed * 4) * 3);
        line(marker.x, 805, system.origin.x, 805);
        noStroke();
        fill(marker.color);
    }
    pop();
}

function drawStar() {
    const star = ['       *       ', '      ***      ', '      ***      ', '***************', '  ***********  ', '    *******    ', '   **** ****   ', '   **     **   '];
    textSize(12);
    fill(255, 232, 109);
    drawingContext.shadowColor = '#ffe56d';
    drawingContext.shadowBlur = 12 + 4 * sin(elapsed * 3);
    star.forEach((line, index) => text(line, system.origin.x, 22 + index * 11));
    drawingContext.shadowBlur = 0;
}

function drawOverlay() {
    textAlign(LEFT, CENTER);
    fill(228, 233, 245);
    textSize(26);
    text('@Janie', 28, 44);
    textSize(16);
    fill(136, 147, 173);
    text(`rotation ${((elapsed * SPIN * 180 / PI) % 360).toFixed(2)}°`, 28, 80);
    text(`lights   ${system.lightCount}`, 28, 104);
    text(`letters  ${system.visibleCount.toLocaleString()}`, 28, 128);
    fill(255, 173, 65);
    circle(599, 49, 9);
    fill(136, 147, 173);
    text(`t ${elapsed.toFixed(1)}s`, 615, 49);
    textAlign(CENTER, CENTER);
    fill(255, 222, 93);
    drawingContext.shadowColor = '#ffce44';
    drawingContext.shadowBlur = 14;
    drawPixelGreeting(GREET, 360, 860);
    if (paused || floor(elapsed * 2) % 2 === 0) rect(603, 835, 4, 43);
    drawingContext.shadowBlur = 0;
    textStyle(NORMAL);
}

// 외부 폰트 없이 작은 사각형으로 레퍼런스의 픽셀 글씨를 그립니다.
function drawPixelGreeting(message, centerX, centerY) {
    const glyphs = {
        M: ['10001','11011','10101','10101','10001','10001','10001'],
        E: ['11111','10000','10000','11110','10000','10000','11111'],
        R: ['11110','10001','10001','11110','10100','10010','10001'],
        Y: ['10001','10001','01010','00100','00100','00100','00100'],
        C: ['01111','10000','10000','10000','10000','10000','01111'],
        H: ['10001','10001','10001','11111','10001','10001','10001'],
        I: ['11111','00100','00100','00100','00100','00100','11111'],
        S: ['01111','10000','10000','01110','00001','00001','11110'],
        T: ['11111','00100','00100','00100','00100','00100','00100'],
        A: ['01110','10001','10001','11111','10001','10001','10001'],
        '2': ['01110','10001','00001','00010','00100','01000','11111'],
        '0': ['01110','10001','10011','10101','11001','10001','01110'],
        '6': ['01110','10000','10000','11110','10001','10001','01110']
    };
    const pixel = 4.2;
    const startX = centerX - (message.length * 6 - 1) * pixel / 2;
    [...message].forEach((letter, index) => {
        const glyph = glyphs[letter];
        if (!glyph) return;
        glyph.forEach((row, y) => [...row].forEach((bit, x) => {
            if (bit === '1') rect(startX + (index * 6 + x) * pixel, centerY - 14 + y * pixel, pixel - 0.3, pixel - 0.3);
        }));
    });
}
