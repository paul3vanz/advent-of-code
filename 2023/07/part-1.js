var fs = require('fs');

const start = performance.now();

const input = fs.readFileSync(__dirname + '/input.txt').toString().trim().split('\r\n');

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const cardScoreMap = cards.map((_, index) => String.fromCharCode(index + 65));

let hands = input.map((line) => {
    const [ hand, bid ] = line.split(' ');

    let rank = 0;

    const cardGroups = hand.split('').sort().join('').match(/(.)\1*/g).sort((a, b) => b.length - a.length);

    // console.log(cardGroups);

    if (cardGroups[0].length === 5) {
        rank = 7; // Five of a kind
    } else if (cardGroups[0].length === 4) {
        rank = 6; // Four of a kind
    } else if (cardGroups[0].length === 3 && cardGroups[1].length === 2) {
        rank = 5; // Full house
    } else if (cardGroups[0].length === 3 && cardGroups[1].length === 1) {
        rank = 4; // Three of a kind
    } else if (cardGroups[0].length === 2 && cardGroups[1].length === 2) {
        rank = 3; // Two pair
    } else if (cardGroups[0].length === 2 && cardGroups[1].length === 1) {
        rank = 2; // One pair
    } else {
        rank = 1; // High card
    }

    const cardScores = hand.split('').map((card) => cardScoreMap[cards.findIndex((cardScores) => card === cardScores)]).reduce((previous, current) => `${previous}${current}`);

    return {
        hand,
        bid,
        rank,
        cardScores,
    };
}).sort((a, b) => {
    return b.rank !== a.rank ? b.rank - a.rank : a.cardScores.localeCompare(b.cardScores);
});

const winnings = hands.reverse().reduce((previous, current, index) => {
    // console.log('hand', (index + 1) * parseInt(current.bid));
    // console.log(previous, current);
    return previous + ((index + 1) * parseInt(current.bid));
}, 0)

const end = performance.now();

// console.log(hands);
// console.log(winnings);

// console.log(`Finished in ${(end - start).toFixed(2)}ms`);
debugger;