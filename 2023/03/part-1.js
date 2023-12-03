var fs = require('fs');

const input = fs.readFileSync(__dirname + '/input2.txt').toString().trim().split('\r\n');

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


input.forEach((line, lineIndex) => {
    line.split('').forEach((character, characterIndex) => {

        if (character.match(validNumbers)) {
            if (current.characters === '') {
                current.position.start = characterIndex;
            }

            current.characters += character;
        }

        if ((character === delimeter || character.match(symbols) || characterIndex === line.length - 1) && current.characters.length >= 1) {
            current.position.end = current.position.start + current.characters.length;

            const boundaryCharacters = {
                previous: line[current.position.start - 1] || '',
                next: line[current.position.end] || '',
                above: input[lineIndex - 1]?.substring(current.position.start -1, current.position.end + 1) || '',
                below: input[lineIndex + 1]?.substring(current.position.start -1, current.position.end + 1) || '',
            };

            // console.log('current', current);

            // console.log(boundaryCharacters.above);
            // console.log(`${boundaryCharacters.previous}${current.characters}${boundaryCharacters.next}`);
            // console.log(boundaryCharacters.below);

            const allBoundaryCharacters = Object.values(boundaryCharacters).join('');

            if (allBoundaryCharacters.match(symbols)) {
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
});

console.log('valid', validPartNumbers);
console.log('invalid', invalidPartNumbers);
console.log('answer', validPartNumbers.reduce((previous, current) => previous + current, 0))