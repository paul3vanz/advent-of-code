var fs = require('fs');

const start = performance.now();

const input = fs.readFileSync(__dirname + '/inputExample.txt').toString().trim().split('\r\n');

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const hands = input.map((line) => {
    const [ hand, bid ] = line.split(' ');

    let rank = 0;

    const cardGroups = hand.split('').sort().join('').match(/(.)\1*/g).sort((a, b) => b.length - a.length);

    console.log(cardGroups);

    if (cardGroups[0].length === 5) {
        rank = 7;
        console.log('Five of a kind');
    } else if (cardGroups[0].length === 4) {
        rank = 6;
        console.log('Four of a kind');
    } else if (cardGroups[0].length === 3 && cardGroups[1].length === 2) {
        rank = 5;
        console.log('Full house');
    } else if (cardGroups[0].length === 3 && cardGroups[1].length === 1) {
        rank = 4;
        console.log('Three of a kind');
    } else if (cardGroups[0].length === 2 && cardGroups[1].length === 2) {
        rank = 3;
        console.log('Two pair');
    } else if (cardGroups[0].length === 2 && cardGroups[1].length === 1) {
        rank = 2;
        console.log('One pair');
    } else {
        rank = 1;
        console.log('High card');
    }

    return {
        hand,
        bid,
        rank,
    };
}).sort((a, b) => {
    b.rank - a.rank
});

const end = performance.now();

console.log(hands);

console.log(`Finished in ${(end - start).toFixed(2)}ms`);
debugger;