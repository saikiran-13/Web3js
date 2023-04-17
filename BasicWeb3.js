const Web3 = require('web3')
const web3 = new Web3('http://localhost:8545')//local development blockchain ganache

async function main() {
  const account = '0xB3Eb81d66a840b2a1a9b21FF52F3d7668Cac5392'
  const to = '0xf5407380983aAD937A70d3fd8AA379840390FAb6'
  const value = web3.utils.toWei('1', 'ether')

  const balance = await web3.eth.getBalance(account)
  console.log('Account balance:', web3.utils.fromWei(balance, 'ether'))

  const nonce = await web3.eth.getTransactionCount(account)
  console.log('Nonce:', nonce)

  const tx = {
    from: account,
    to: to,
    value: value,
    gas: 21000,
    nonce: nonce,
  }

  const signedTx = await web3.eth.accounts.signTransaction(tx, '0xa5afd8c0afe12803cb0043cfd4f72725e7bb173a008be86722ed2976a1a49b1fe')
  console.log('Signed transaction:', signedTx)

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
  console.log('Transaction receipt:', receipt)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
