const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledContract = require('../build/CloudMarket.json');

const mnemonic = "wallet_seed";
const network = "network_address";

const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);
const ABI = compiledContract.abi;
const Bytecode = compiledContract.evm.bytecode.object;

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    console.log("Deploying from account:", accounts[0]);

    const result = await new web3.eth.Contract(ABI)
        .deploy({  data: Bytecode })
        .send({ from: accounts[0] });  

    console.log('Contract deployed to:', result.options.address);

    provider.engine.stop();
};

deploy();