import web3 from './web3';
import CloudMarket from './build/CloudMarket.json';

const cloudMarket = () => {
    return new web3.eth.Contract(CloudMarket.abi, 'contract_address');
};

export default cloudMarket;