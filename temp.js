//batch requests
const Web3 = require('web3');

// Create a new instance of Web3
let web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/Uo1baWy63r3EgbiS-mxrkx0M-5tR4heR"))

// Define an array of batch requests
const batch = new web3.BatchRequest();
batch.add(web3.eth.getBalance.request('0x4d8f1cff7b1414be6f773b7fda772cee94b92f1f', 'latest', (error, result) => {
    if (!error) {
        console.log('Balance of address 0x4d8f1cff7b1414be6f773b7fda772cee94b92f1f:', web3.utils.fromWei(result, 'ether'), 'ETH');
    } else {
        console.error('Error getting balance:', error);
    }
}));
batch.add(web3.eth.getBlockNumber.request((error, result) => {
    if (!error) {
        console.log('Current block number:', result);
    } else {
        console.error('Error getting block number:', error);
    }
}));
batch.add(web3.eth.getTransactionCount.request('0x4d8f1cff7b1414be6f773b7fda772cee94b92f1f', 'pending', (error, result) => {
    if (!error) {
        console.log('Transaction count of address 0x4d8f1cff7b1414be6f773b7fda772cee94b92f1f:', result);
    } else {
        console.error('Error getting transaction count:', error);
    }
}));

// Execute the batch request
batch.execute();
