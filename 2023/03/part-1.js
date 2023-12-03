var fs = require('fs');

const input = fs.readFileSync(__dirname + '/input.txt').toString().trim().split('').filter((character) => character.match(/\S/));

const lineLength = 10;
const validNumbers = /[0-9]/;
const delimeter = '.';
const symbols = /[^\w\.]/;

const validPartNumbers = [];
const invalidPartNumbers = [];

let current = {
    characters: '',
    position: {
        start: null,
        end: null,
    },
    isValid: false,
};

input.forEach((character, index) => {
    // Check if number
    if (character.match(validNumbers)) {
        if (current.characters === '') {
            current.position.start = index;
        }

        current.characters += character;
    }

    // Push to array if delimeter hit
    if (character === delimeter && current.characters.length >= 1) {
        current.position.end = current.position.start + current.characters.length;

        // Check character boundary
        const positionsToCheck = [
            current.position.start - 1,
            current.position.end,
            // Previous line
            ...Array(current.characters.length + 2).fill().map((_, index) => current.position.start - 1 - lineLength + index),
            // Next line
            ...Array(current.characters.length + 2).fill().map((_, index) => current.position.start - 1 + lineLength + index),
        ];

        console.log('current', current);
        console.log(positionsToCheck);

        if (positionsToCheck.some((checkIndex) => {
            if (!input[checkIndex]) {
                return;
            }

            console.log(checkIndex, input[checkIndex]);

            const boundedBySymbol = input[checkIndex].match(symbols) && input[checkIndex] !== delimeter;

            return boundedBySymbol;
        })) {
            current.isValid = true;
            console.log('IS VALID');
        }

        if (current.isValid) {
            validPartNumbers.push(parseInt(current.characters));
        } else {
            invalidPartNumbers.push(parseInt(current.characters));
        }
        current.characters = '';
        current.isValid = false;
    }
});

console.log('valid', validPartNumbers);
console.log('invalid', invalidPartNumbers);
console.log('answer', validPartNumbers.reduce((previous, current) => previous + current, 0))