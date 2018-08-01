import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xb7609adb3E8692F5b75C56e7Ba48b73A06c6E691',
);

export default instance;
