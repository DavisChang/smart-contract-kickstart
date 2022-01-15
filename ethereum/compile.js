const path = require('path');
const fse = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fse.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')
const source = fse.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    contractFile: {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts.contractFile;

fse.ensureDirSync(buildPath);
for (let contract in output) {
  fse.outputJSONSync(
    path.resolve(buildPath, `${contract}.json`),
    output[contract]
  );
}

