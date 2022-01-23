import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

// Address
const CONTRACT_ADDRESS = '0x851539f3CB937CDE00029B803ff22F95ACFF39B7'

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  CONTRACT_ADDRESS
)

export default instance
