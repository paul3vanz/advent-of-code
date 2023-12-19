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
    };
});

gamesSummary.forEach((gameSummary) => totalPoints += gameSummary.points);

const end = performance.now();

console.log(totalPoints);

console.log(`Finished in ${(end - start).toFixed(2)}ms`);

// console.table(gamesSummary);
