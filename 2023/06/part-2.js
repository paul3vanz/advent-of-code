var fs = require('fs');

const input = fs.readFileSync(__dirname + '/input.txt').toString().trim().split('\n');

const times = [parseInt(input[0].match(/\d+/g).join(''))];
const records = [parseInt(input[1].match(/\d+/g).join(''))];

let total = 0;

times.forEach((time, index) => {
    const record = records[index];

    for (let i = 0; i <= time; i++) {
        const x = i * (time - i);
        if (x > record) {
            total++;
        }

        const progress = Math.floor(i/time*100);

        if (progress % 10 === 0) {
            console.log(`${progress}%`);
        }
    }
});

// console.table(total);
console.table(total);