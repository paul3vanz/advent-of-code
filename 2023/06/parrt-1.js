var fs = require('fs');

const input = fs.readFileSync(__dirname + '/inputExample.txt').toString().trim().split('\n');

const times = input[0].match(/\d+/g);
const records = input[1].match(/\d+/g);

const total = [];

times.forEach((time, index) => {
    const record = records[index];

    const options = [];

    for (let i = 0; i <= time; i++) {
        const x = i * (time - i);
        options.push([i, x]);
    }

    const winnableOptions = options.filter((option) => option[1] > record).length;

    total.push(winnableOptions);

    // console.table(options);
});

console.table(total);
console.table(total.reduce((previous, current) => previous * current));