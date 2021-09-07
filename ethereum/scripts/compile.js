const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const contractFileName = 'CloudMarket.sol';
const buildPath = path.resolve('..', __dirname, 'build');
fs.removeSync(buildPath);

const marketPath = path.resolve('..', __dirname, 'contracts', contractFileName),
    source = fs.readFileSync(marketPath, 'UTF-8'),
    input = {
        language: 'Solidity',
        sources: {},
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };

input.sources[contractFileName] = {
    content: source
};

let output, contracts;
try {
    output = JSON.parse(solc.compile(JSON.stringify(input)));
    contracts = output.contracts[contractFileName];
} catch (error) {
    console.error('Error :', output.errors[0]);
}

fs.ensureDirSync(buildPath);

for (let contract in contracts) {
    if (contracts.hasOwnProperty(contract)) {
        fs.outputJsonSync(
            path.resolve(buildPath, `${contract}.json`),
            contracts[contract]
        );
    }
}

console.log('Contract successfully compiled!');
process.exit(0);