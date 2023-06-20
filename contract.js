const Web3 = require("web3")
const web3 = new Web3("https://goerli.infura.io/v3/150d4a84029045bf909c0fa607264e3d")
const contractAddress = "0x1D83e39E676cD43cD282E6C59903718a89662860"
const senderAddress = "0xec18A3d572487d4DEFdd3864E7e992148319ca40"
const PRIVATE_KEY = "private key
	"

const receiverAddress = "0xe6A9D13D93CbA162A0fB46d338ADD071247910f3"
const contract = new web3.eth.Contract([
	{
		"inputs": [],
		"name": "decrementcount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "displayamount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "incrementcount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_count",
				"type": "uint256"
			}
		],
		"name": "setcount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "contractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "count",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "money",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
], "0x1D83e39E676cD43cD282E6C59903718a89662860")

async function methods(){
	await contract.methods.count().call().then(console.log)
	await contract.methods.money().call().then(console.log)
	await contract.methods.incrementcount().call().then(console.log)
	await contract.methods.setcount(2020).send({
		from: "0xec18A3d572487d4DEFdd3864E7e992148319ca40"
	})
	
	await contract.methods.count().call().then(console.log)

	// await web3.eth.getTransactionReceipt("0x218fb6d89cdd97a374604f5eaa828671de884e6f4d93384c9f5214304d25313e").then(console.log);//Takes transaction hash as parameter
	
	await web3.eth.signTransaction({//Here we are sending the transcation to the network and private key not needed bydefault it uses account associated with web3 provider
		from:senderAddress,
		to:receiverAddress,
		value:web3.utils.toWei("0.03","ether"),
		gas:21000
	},PRIVATE_KEY)
	.then((signedTx)=>{
		web3.eth.sendSignedTransaction(signedTx.rawTransaction)
		.on('transactionHash',(hash)=>console.log("Hash",hash))
		.on('receipt',(receipt)=>console.log("Receipt",receipt))
		.on('error',(err)=>console.error(err))
	})
	.catch(console.error)
	contract.methods.contractBalance().call().then((bal)=>console.log("balance",bal))

	//For emitting events
// 	contract.methods.myEvent(arg1, arg2, arg3)
// .send({from: '0x123456789...', gas: 200000})
// .then(receipt => {
//   console.log('Event emitted successfully:', receipt);
// })
// .catch(error => {
//   console.error('Failed to emit event:', error);
// });
}

methods()
