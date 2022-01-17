const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')

const CampaignFactory = require('./build/CampaignFactory.json')
const Campaign = require('./build/Campaign.json')

// only for testing, you could get this from MetaMask
// get more testnet(rinkeby) ether from https://faucets.chain.link/rinkeby
const provider = new HDWalletProvider(
  '*** **** **** ****',
  'https://rinkeby.infura.io/v3/9428e1df1bdd468e9c748fdf057ebbf9'
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const campaignFactoryResult = await new web3.eth.Contract(CampaignFactory.abi)
    .deploy({ data: CampaignFactory.evm.bytecode.object })
    .send({ gas: '10000000', from: accounts[0] })

  // 0x851539f3CB937CDE00029B803ff22F95ACFF39B7
  console.log('Contract deployed to:', campaignFactoryResult.options.address)
  provider.engine.stop()
}

deploy()