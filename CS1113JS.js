let A = 0, B = 0;
const canvas = document.createElement('pre');
document.body.appendChild(canvas);

function renderFrame() {
    const width = 40, height = 20;
    const output = Array(width * height).fill(' ');
    const zbuffer = Array(width * height).fill(0);
    for (let theta = 0; theta < 6.28; theta += 0.07) {
        for (let phi = 0; phi < 6.28; phi += 0.02) {
            const cosA = Math.cos(A), sinA = Math.sin(A);
            const cosB = Math.cos(B), sinB = Math.sin(B);
            const cosTheta = Math.cos(theta), sinTheta = Math.sin(theta);
            const cosPhi = Math.cos(phi), sinPhi = Math.sin(phi);

            const circlex = cosTheta;
            const circley = sinTheta;

            const x = circlex * (cosB * cosPhi + sinA * sinB * sinPhi) - circley * cosA * sinB;
            const y = circlex * (sinB * cosPhi - sinA * cosB * sinPhi) + circley * cosA * cosB;
            const z = cosA * (circlex * sinPhi + circley * sinA) + 5;

            const ooz = 1 / z;
            const xp = Math.floor(width / 2 + width * x * ooz / 2);
            const yp = Math.floor(height / 2 - height * y * ooz / 2);
            const idx = xp + yp * width;

            const luminance_index = Math.floor(8 * ((cosPhi * cosTheta * sinB - cosA * cosTheta * sinPhi - sinA * sinTheta + cosB * (cosA * sinTheta - cosTheta * sinA * sinPhi))));
            const luminance = ".,-~:;=!*#$@"[Math.max(luminance_index, 0)];

            if (ooz > zbuffer[idx]) {
                zbuffer[idx] = ooz;
                output[idx] = luminance;
            }
        }
    }
    canvas.textContent = output.join('');
    A += 0.04;
    B += 0.02;
    requestAnimationFrame(renderFrame);
}

renderFrame();
