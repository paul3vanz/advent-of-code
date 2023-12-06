var fs = require('fs');

const input = fs.readFileSync(__dirname + '/inputExample.txt').toString().trim().split('\n');

const times = [7, 15, 30]; //input[0];
const records = [9, 40, 200] //input[1];

const total = [];

times.forEach((time, index) => {
    const record = records[index];

    const options = [];

    for (let i = 0; i <= time; i++) {
        const x = i * (time - i);
        options.push([i, x]);
    }

    const winnableOptions = options.filter((option) => option[1] > record).length;

    // console.table(options);
    // console.table(winnableOptions);
});

console.table(total);