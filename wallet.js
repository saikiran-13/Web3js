const Web3 = require("web3")
const web3 = new Web3("https://polygon-mumbai.g.alchemy.com/v2/Uo1baWy63r3EgbiS-mxrkx0M-5tR4heR")
//Adding the private key to connect with wallet account
web3.eth.accounts.wallet.add('ce5fab68c643337fc8ba3bb057d958be6f23cc2d1541478ebe66033630defc55')

web3.eth.accounts.wallet.add('ca37043116b550234801704a687ff1157c4287adde8df5944b6b66d3b297a9d6')
let encrypted = web3.eth.accounts.wallet.encrypt('simform')
console.log("Encrypted ==> ",encrypted)
console.log("Decrypted ==> ",web3.eth.accounts.wallet.decrypt(encrypted,'simform'))
console.log(web3.eth.accounts.wallet[1])
async function wallet(){
	console.log(web3.utils.fromWei(await web3.eth.getBalance('0xCe1A888730BD1997626619d795FEc812caa70031')))
   await web3.eth.accounts.wallet.remove('0x4d8f1cff7b1414be6f773b7fda772cee94b92f1f')
   console.log(web3.eth.accounts.wallet[1])
   await web3.eth.accounts.wallet.clear()
    console.log(web3.eth.accounts.wallet[0])
}
wallet()

