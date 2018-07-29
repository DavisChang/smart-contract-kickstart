const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  // 12 word mnemonic which addresses are created from
  'symptom route sausage inspire believe wink limit ridge bind cram matter stuff',
  // URI of Ethereum client to send all other non-transaction-related Web3 requests
  'https://rinkeby.infura.io/poK6FIdwD9FirtC6iQzI',
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  // can find out on https://rinkeby.etherscan.io/
  console.log('Contract deployed to ', result.options.address);
};
deploy();
