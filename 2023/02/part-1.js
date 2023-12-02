var fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim().split('\n');

const cubeTotals = {
    red: 12,
    green: 13,
    blue: 14,
}

const gamesSummary = {
    possible: new Set(),
    impossible: new Set(),
}

input.map((line, index) => {
    const gameId = index + 1;
    const sets = line.split(':')[1].trim().split(';');

    let isImpossible = false;

    sets.forEach((set) => {
        const cubes = set.trim().split(',');

        cubes.forEach((cube) => {
            const count = cube.trim().split(' ')[0];
            const colour = cube.trim().split(' ')[1];

            if (count > cubeTotals[colour]) {
                isImpossible = true;
            }
        });
    });

    if (isImpossible) {
        gamesSummary.impossible.add(gameId);
    } else {
        gamesSummary.possible.add(gameId);
    }
});

console.log([...gamesSummary.possible].reduce((previousValue, currentValue) => previousValue + currentValue, 0));