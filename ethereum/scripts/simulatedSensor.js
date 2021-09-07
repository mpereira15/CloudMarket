
/*
*   simulatedSensor script
*
*   Command: node ethereum/simulatedSensor <productId> <track_period>
*
*   @productId: product identifier.
*   @track_period: time spacing between sample tacking. In seconds.
*
*/

const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const compiledContract = require('./build/CloudMarket.json');

const mnemonic = 'sensor_wallet_seed';
const network = 'network_address';
const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);
const cloudMarket = new web3.eth.Contract(compiledContract.abi, 'contract_address');

const locations = ['Portugal', 'Spain', 'United States', 'United Kingdom'];

const simulatedSensor = async() => {

    if(process.argv[2] != null) {
        let productId, temperature, humidity, c02Level, soilMoisture, soilPh, location;

        productId = process.argv[2];
        temperature = Math.floor(Math.random() * 45); // Range 0-45 celsius
        humidity = Math.floor(Math.random() * 100);
        c02Level = Math.floor(Math.random() * 10);
        soilMoisture = Math.floor(Math.random() * 100);
        soilPh = Math.floor(Math.random() * 14);
        location = locations[Math.floor(Math.random()*locations.length)];

        const accounts = await web3.eth.getAccounts();

        cloudMarket.methods.addData(
            productId,
            temperature,
            humidity,
            c02Level,
            soilMoisture,
            soilPh,
            location
        ).send({
            from: accounts[0]
        });

        console.log('Data added to product with id', productId);
    } else {
        console.error('Error :: Missing product identifier parameter');
    }
    provider.engine.stop();
};

if(process.argv[3] != null) {
    setInterval(simulatedSensor, process.argv[3] * 1000);
} else {
    console.error('Error :: Missing period parameter');
}