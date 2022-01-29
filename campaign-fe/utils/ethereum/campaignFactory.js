import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

// Address
const CONTRACT_ADDRESS = '0x3DA576b66B77a01d783e2926057495dBe29Cb2f9'

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  CONTRACT_ADDRESS
)

export default instance
