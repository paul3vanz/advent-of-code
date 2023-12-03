var fs = require('fs');

const input = fs.readFileSync(__dirname + '/input.txt').toString().trim().split('\n');

const digitWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const parsedLines = input.map((line) => {
    const firstDigit = findFirstDigit(line);
    const lastDigit = findLastDigit(line);

    return parseInt(firstDigit + lastDigit);
});

console.log(parsedLines.reduce((previousValue, currentValue) => previousValue + currentValue, 0));

function findFirstDigit(input) {
    let output = input;

    digitWords.forEach((digitWord, index) => {
        output = output.replace(digitWord, digitWord[0] + (index + 1) + digitWord[digitWord.length - 1]);
    });

    output = output.replace(/\D/g, '');

    return output[0];
}

function findLastDigit(input) {
    const inputReversed = reverseString(input);

    let output = inputReversed.toString();

    digitWords.forEach((digitWord, index) => {
        output = output.replace(reverseString(digitWord), reverseString(digitWord) + (index + 1));
    });

    output = output.replace(/\D/g, '');

    return output[0];
}

function reverseString(input) {
    return input.split('').reverse().join('');
}