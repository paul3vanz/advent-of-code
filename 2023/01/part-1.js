var fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim().split('\n');

const parsedLines = input.map((line) => {
    const digits = line.replace(/\D/g, '');

    return parseInt(digits[0] + digits[digits.length - 1]);
});

console.log(parsedLines.reduce((previousValue, currentValue) => previousValue + currentValue, 0));