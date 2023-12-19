var fs = require('fs');

const start = performance.now();

const input = fs.readFileSync(__dirname + '/input.txt').toString().trim().split('\r\n').map((x) => `.${x}.`);

const validNumbers = /[0-9]/;
const delimeter = '.';
const symbols = /[^\w\.]/;
const gearSymbol = '*';

const validPartNumbers = [];
const invalidPartNumbers = [];

const gears = {};
const gearRatio = null;

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

            const boundary = [
                boundaryCharacters.previous ? {
                    line: lineIndex,
                    offset: current.position.start - 1,
                    character: line[current.position.start - 1] || '',
                } : null,
                boundaryCharacters.next ? {
                    line: lineIndex,
                    offset: current.position.end,
                    character: line[current.position.end] || '',
                } : null,
            ].filter((x) => x);

            // Above
            input[lineIndex - 1]?.substring(current.position.start - 1, current.position.end + 1).split('').forEach((character, index) => {
                boundary.push({
                    line: lineIndex - 1,
                    offset: current.position.start - 1 + index,
                    character,
                });
            });

            // Below
            input[lineIndex + 1]?.substring(current.position.start - 1, current.position.end + 1).split('').forEach((character, index) => {
                boundary.push({
                    line: lineIndex + 1,
                    offset: current.position.start - 1 + index,
                    character,
                });
            });

            boundary.filter((boundaryItem) => boundaryItem.character === gearSymbol).forEach((gear) => {
                const gearId = `${gear.line}-${gear.offset}`;

                // console.log(gear);

                if (gears[gearId]?.length) {
                    gears[gearId].push(current.characters);
                } else {
                    gears[gearId] = [current.characters];
                }
            });

            // console.table(boundary);

            // console.log('current', current);

            // console.log(boundaryCharacters.above);
            // console.log(`${boundaryCharacters.previous}${current.characters}${boundaryCharacters.next}`);
            // console.log(boundaryCharacters.below);

            const allBoundaryCharacters = Object.values(boundaryCharacters).join('');

            if (allBoundaryCharacters.match(symbols)) {
                current.isValid = true;
                // console.log('IS VALID');
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

const end = performance.now();

console.table(gears);

console.log('gearRatio', Object.values(gears).filter((gear) => gear.length === 2).reduce((previous, current) => previous + (current[0] * current[1]), 0));

console.log('valid', validPartNumbers);
console.log('invalid', invalidPartNumbers);
console.log('answer', validPartNumbers.reduce((previous, current) => previous + current, 0))

console.log(`Finished in ${(end - start).toFixed(2)}ms`);