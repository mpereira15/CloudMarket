const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledContract = require('./build/Market.json');

const mnemonic = "survey captain pudding flip clap shoot cover shadow canal waste host despair";
const network = "https://goerli.infura.io/v3/d7180cae7ee44afa8793612592b58dc7";

const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);
const ABI = compiledContract.abi;
const BC = compiledContract.evm.bytecode.object;

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attemping to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(ABI)
        .deploy({ data: "0x" + BC, arguments: [1] })
        .send({ from: accounts[0] });  

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};

deploy();