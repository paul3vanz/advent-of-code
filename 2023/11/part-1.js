var fs = require('fs');

const start = performance.now();

const rows = fs.readFileSync(__dirname + '/inputExample.txt').toString().trim().split('\r\n');

const rowWidth = rows[0].length;

// Expand rows
const emptyRows = rows.map((row) => row.indexOf('#') === -1);

// Expand columns
const emptyColumns = new Array(rowWidth).fill('').map((_, index) => rows.every((row) => row[index] === '.'));

// Plot galaxies in object

// Loop through - use manhattan distance

const answer = '';

const end = performance.now();

console.log('Answer:', answer);

console.log(`Finished in ${(end - start).toFixed(2)}ms`);
debugger;