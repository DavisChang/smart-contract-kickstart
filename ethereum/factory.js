import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xCfcB361bcBCCb2Cc785C64CCE389AD6A9B4BED82',
);

export default instance;
