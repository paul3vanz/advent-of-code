var fs = require('fs');

const start = performance.now();

const input = fs.readFileSync(__dirname + '/input.txt').toString().trim().split('\r\n');

const pattern = /(\w{3}) = \((\w{3}), (\w{3})\)/;

const steps = input[0].split('');
let currentStepIndex = 0;
let totalSteps = 0;

const nodeNetwork = input.slice(2).map((nodeParts) => nodeParts.match(pattern).slice(1));

const destinationNode = 'ZZZ';
let currentNode = nodeNetwork.find((node) => node[0] === 'AAA');

while (currentNode[0] !== destinationNode) {
    console.log(`   ${currentNode[0]}`);
    console.log(`   / \\`);
    console.log(`${currentNode[1]}   ${currentNode[2]}`);

    if (steps[currentStepIndex] === 'L') {
        console.log(` \\`);
        console.log(`  ${steps[currentStepIndex]}`);
        console.log(`   \\`);
    } else {
        console.log(`       /`);
        console.log(`      ${steps[currentStepIndex]}`);
        console.log(`     /`);
    }

    const nextNode = steps[currentStepIndex] === 'L' ? currentNode[1] : currentNode[2];

    currentNode = nodeNetwork.find((node) => node[0] === nextNode);

    currentStepIndex = currentStepIndex === steps.length - 1 ? 0 : currentStepIndex + 1;

    totalSteps++;
}

const end = performance.now();

console.log(`   ${currentNode[0]}`);

console.log(`Total steps: ${totalSteps}`);

console.log(`Finished in ${(end - start).toFixed(2)}ms`);
debugger;