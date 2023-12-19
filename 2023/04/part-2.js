var fs = require('fs');

const start = performance.now();

const parsePattern = /^Card\s+([0-9]+): ([\d|\s]*)\| ([\d|\s]*)$/;

let totalPoints = 0;

const gamesSummary = fs.readFileSync(__dirname + '/input.txt').toString().trim().split('\r\n').map((gameData) => {

    const parsedGameData = gameData.match(parsePattern);

    const winningNumbers = parsedGameData[2].match(/(\d)+/g).map((number) => parseInt(number));
    const chosenNumbers = parsedGameData[3].match(/(\d)+/g).map((number) => parseInt(number));

    const matchedNumbers = chosenNumbers.filter((chosenNumber) => winningNumbers.includes(chosenNumber));

    const points = matchedNumbers.length ? Array(matchedNumbers.length).fill(1).reduce((previous, current) => previous * 2) : 0;

    return {
        gameId: parsedGameData[1],
        winningNumbers,
        chosenNumbers,
        matchedNumbers,
        points,
        copies: 1,
    };
});

gamesSummary.forEach((gameSummary, index) => {
    for(let currentCopy = 0; currentCopy < gameSummary.copies; currentCopy++){
        for(let i = 0; i < gameSummary.matchedNumbers.length; i++){
          const nextCard = gamesSummary[index + i + 1];
          nextCard.copies += 1;
        }
      }
});

const totalCards = gamesSummary.reduce((previous, current) => {return previous + current.copies}, 0);

gamesSummary.forEach((gameSummary) => totalPoints += gameSummary.points);

const end = performance.now();

console.log('Part 1 - Points:', totalPoints);
console.log('Part 2 - Scratchcards:', totalCards);

console.log(`Finished in ${(end - start).toFixed(2)}ms`);

// console.table(gamesSummary);
