var fs = require('fs');

const start = performance.now();

const input = fs.readFileSync(__dirname + '/input.txt').toString().trim().split('\r\n');

const answers = [];

input.forEach((line) => {
    const sequence = line.split(' ').reverse().map((item) => parseInt(item));

    let nextInSequence = 0;

    let diffs = sequence;

    do {
        diffs = getDiffs(diffs);

        if (diffs.slice(-1)[0]) {
            nextInSequence += diffs.slice(-1)[0];
        }
    }
    while (!diffs.every((item) => item === 0))

    answers.push(sequence.slice(-1)[0] + nextInSequence);
});

const end = performance.now();

console.log('Answer:', answers.reduce((previous, current) => previous + current, 0));

console.log(`Finished in ${(end - start).toFixed(2)}ms`);
debugger;

function getDiffs(sequence) {
    return sequence.reduce((accumulator, _, index) => {
        accumulator[index] = sequence[index + 1] - sequence[index];

        return accumulator;
    }, []).slice(0, -1);
}