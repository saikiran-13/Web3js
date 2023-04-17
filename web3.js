let Web3 = require('web3')
const {KEY,KEY2} =  require('./privatekeys')
//Providing the ganache rpc server url inside HttpProvider to interact with local blockchain 
//3 providers HttpProvider,IpcProvider,Websocketprovider
//providers contains lot of details like credentials,events,agents,connected,headers,timeouts

let web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/Uo1baWy63r3EgbiS-mxrkx0M-5tR4heR"))
// console.log(web3.eth.accounts);
const PRIVATE_KEY = KEY
const PRIVATE_KEY2 = KEY2
const account1 = web3.eth.accounts.wallet.add(PRIVATE_KEY).address//sender account by privatekey
const account2 = '0x4d8f1cff7b1414be6f773b7fda772cee94b92f1f'//receiver account address
async function wallet(){
	console.log(web3.utils.fromWei(await web3.eth.getBalance('0xCe1A888730BD1997626619d795FEc812caa70031')))
    //send matic to from account1 to account2 on metamask

    await web3.eth.sendTransaction({//Here we are sending the transcation to the network and private key not needed bydefault it uses account associated with web3 provider
        from:account1,
        to:account2,
        value:web3.utils.toWei("0.01","ether"),
        gas:21000
    }).on('receipt',console.log)

    //send matic to from account2 to account1 on metamask using signTransaction

    await web3.eth.accounts.signTransaction({
        from:account2,
        to:account1,
        value:web3.utils.toWei("0.04","ether"),
        gas:21000
    },PRIVATE_KEY2)
    .then((signedTx)=>{
        web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .on('transactionHash',function(hash){
            console.log("Transaction Hash:",hash)
        })
        .on('receipt',(receipt)=>{
            console.log("Receipt",receipt)
        })
        .on('error',(err)=>{
            console.error(err)
        })
    })
    .catch((err)=>{
        console.error(err)
    })   

    
}
wallet()

web3.eth.getTransactionCount("0x9Fdd35beA138975957C1344401229a691574b6e3").then(console.log)// This provides the nonce
// web3.eth.getTransactionReceipt("0xb7dd2abb1690ca8d5dcdb4bfcda5b5bd66526f1ebf1c41da68b2c0d90cba26a9").then(console.log);//Takes transaction hash as parameter
// console.log(web3)
