var fs = require('fs');

const start = performance.now();

const input = fs.readFileSync(__dirname + '/input.txt').toString().trim().split('\r\n');

const answers = [];

input.forEach((line) => {
    // console.log('line', line);

    const sequence = line.split(' ').map((item) => parseInt(item));

    let nextInSequence = 0;

    let diffs = sequence;

    do {
        diffs = getDiffs(diffs);

        if (!isNaN(diffs.slice(-1)[0])) {
            nextInSequence += diffs.slice(-1)[0];
        }

        // console.log('diffs', diffs);
    }
    while (!diffs.every((item) => item === 0))

    // console.log(line, sequence.slice(-1)[0] + nextInSequence);

    // console.log(sequence.slice(-1)[0] + nextInSequence);

    answers.push(sequence.slice(-1)[0] + nextInSequence);
});

const end = performance.now();

console.log('answers', answers.reduce((previous, current) => previous + current, 0));

console.log(`Finished in ${(end - start).toFixed(2)}ms`);
debugger;

function getDiffs(sequence) {
    return sequence.reduce((acc, _, index) => {
        acc[index] = sequence[index + 1] - sequence[index];
        return acc;
    },[]).slice(0, -1);
}