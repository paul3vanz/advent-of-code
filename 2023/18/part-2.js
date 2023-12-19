var fs = require('fs');

const start = performance.now();

const directions = ['R', 'D', 'L', 'U'];

const steps = fs.readFileSync(__dirname + '/input.txt').toString().trim().split('\r\n');

let area = 0;
let perimeter = 0;
let currentPosition = [1, 1];
const vertices = [currentPosition];

steps.forEach((step) => {
    const parsed = step.match(/#(.{6})/)[1];
    const steps = parseInt(parsed.substring(0, 5), 16);
    const direction = directions[parsed.charAt(5)];

    perimeter += parseInt(steps);

    let [newRow, newColumn] = currentPosition;

    switch (direction) {
        case 'U': newRow -= parseInt(steps); break;
        case 'D': newRow += parseInt(steps); break;
        case 'L': newColumn -= parseInt(steps); break;
        case 'R': newColumn += parseInt(steps); break;
    }

    currentPosition = [newRow, newColumn];
    vertices.push(currentPosition);
});

vertices.forEach((_, index) => {
    const [currentX, currentY] = vertices[index];
    const [nextX, nextY] = vertices[index + 1] || vertices[0];

    area += nextX * currentY - currentX * nextY;
});

const end = performance.now();

console.log('Answer:', (area / 2) + (perimeter / 2 + 1));

console.log(`Finished in ${(end - start).toFixed(2)}ms`);
debugger;