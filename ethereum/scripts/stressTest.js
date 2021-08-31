const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const compiledContract = require('./build/CloudMarket.json');

const mnemonic = 'survey captain pudding flip clap shoot cover shadow canal waste host despair';
const network = 'http://13.80.105.129:8545';
const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);
const cloudMarket = new web3.eth.Contract(compiledContract.abi, '0x4db4E347140EDFBf081058a8683244160F7593fD');
const nProducts = '50'

const stressTest = async() => {
    const pName = 'ProductTesting'
    const pDescription = 'Description of the product'
    const pTracker = '0xb1618dcb53C7122ffC53d21eA0C197a495E0b267'

    const accounts = await web3.eth.getAccounts();

    for(let i=0;i<nProducts;i++) {
        cloudMarket.methods.createProduct(
            pName,
            pDescription,
            pTracker
        ).send({
            from: accounts[0]
        });
    }

    provider.engine.stop();
};

stressTest();