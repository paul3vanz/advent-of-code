var fs = require('fs');

const start = performance.now();

const rows = fs.readFileSync(__dirname + '/inputExample.txt').toString().trim().split('\r\n');

const rowWidth = rows[0].length;

// Expand rows

// Expand columns

// Plot galaxies in object

// Loop through - use manhattan distance

const answer = '';

const end = performance.now();

console.log('Answer:', answer);

console.log(`Finished in ${(end - start).toFixed(2)}ms`);
debugger;