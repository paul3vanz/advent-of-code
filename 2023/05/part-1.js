var fs = require('fs');

const mapPattern = /(.*)?-to-(.*) map:[\r\n]+([\d\s]+)/;
const seedPattern = /^seeds: ([\d ]+)/;

let currentSourceKey = 'seed';
let currentSourceValue = 0;
let nextSourceKey = '';
let nextSourceValue = 0;

const locations = [];

const input = fs.readFileSync(__dirname + '/input.txt').toString();

const seeds = input.match(seedPattern)[1].split(' ').map((seed) => parseInt(seed));

const mappings = [];

// Build up mapping lookup table
const sections = input.match(new RegExp(mapPattern, 'g')).forEach((group) => {
    const parsed = group.match(new RegExp(mapPattern));
    mappings[parsed[1]] = {
        [parsed[2]]: parsed[3].trim().split('\r\n').map((mapping) => {
            const parts = mapping.split(' ').map((part) => parseInt(part));
            return {
                source: {
                    from: parts[1],
                    to: parts[1] + parts[2] - 1,
                },
                destination: {
                    from: parts[0],
                    to: parts[0] + parts[2] - 1,
                },
            }
        }),
    };
});

// Evaluate each seed
seeds.forEach((seed) => {

    currentSourceKey = 'seed';
    currentSourceValue = seed;

    // Loop through each map until the end
    while (currentSourceKey !== 'location') {
        const source = mappings[currentSourceKey];

        // Get name of next map to lookup
        nextSourceKey = Object.keys(source)[0];

        // Look up mapping
        const check = mappings[currentSourceKey][nextSourceKey];

        // Store destination
        let foundDestination = 0;

        check.forEach((c) => {
            const isInRange = currentSourceValue >= c.source.from && currentSourceValue <= c.source.to;

            if (isInRange) {
                const offset = currentSourceValue - c.source.from;
                foundDestination = c.destination.from + offset;
            }
        });

        if (foundDestination) {
            nextSourceValue = foundDestination;
        } else {
            nextSourceValue = currentSourceValue;
        }

        // console.log(currentSourceValue, currentSourceKey, nextSourceKey, nextSourceValue);

        currentSourceKey = nextSourceKey;
        currentSourceValue = nextSourceValue;
    }

    locations.push(nextSourceValue);
});

console.log(Math.min(...locations));