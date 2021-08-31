import web3 from './web3';
import CloudMarket from './build/CloudMarket.json';

export default cloudMarket => {
    return new web3.eth.Contract(CloudMarket.abi, '0x19AcE712cB316B118F75583774CfB0391B5a07a6');
};