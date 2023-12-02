var fs = require('fs');

const input = fs.readFileSync(__dirname + '/input.txt').toString().trim().split('\n');

const cubeTotals = {
    red: 12,
    green: 13,
    blue: 14,
}

const gamesSummary = {
    possible: new Set(),
    impossible: new Set(),
    power: 0,
}

input.map((game, index) => {
    const gameId = index + 1;
    const sets = game.split(':')[1].trim().split(';');

    let isImpossible = false;

    const upperBounds = {
        red: 0,
        green: 0,
        blue: 0,
    };

    sets.forEach((set) => {
        const cubes = set.trim().split(',');

        cubes.forEach((cube) => {
            let [count, colour] = cube.trim().split(' ');

            count = parseInt(count);

            if (count > cubeTotals[colour]) {
                isImpossible = true;
            }

            if (count > upperBounds[colour]) {
                upperBounds[colour] = count;
            }
        });
    });

    if (isImpossible) {
        gamesSummary.impossible.add(gameId);
    } else {
        gamesSummary.possible.add(gameId);
    }

    gamesSummary.power += upperBounds.red * upperBounds.green * upperBounds.blue;
});

console.log('Part 1: Possible games sum:', [...gamesSummary.possible].reduce((previousValue, currentValue) => previousValue + currentValue, 0));
console.log('Part 2: Power:', gamesSummary.power);