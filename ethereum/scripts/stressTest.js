const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const compiledContract = require('../build/CloudMarket.json');

const mnemonic = 'wallet_seed';
const network = 'network_address';
const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);
const cloudMarket = new web3.eth.Contract(compiledContract.abi, 'contract_address');

const NProduct = 'n_transactions';

const stressTest = async() => {
    const pName = 'ProductTesting'
    const pDescription = 'Description of the product'
    const pTracker = 'tracker_address'

    const accounts = await web3.eth.getAccounts();

    for(let i=0; i<NProduct; i++) {
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