const { ethers } = require('ethers')

// Generate a new random wallet
const wallet = ethers.Wallet.createRandom()
console.log('Address:', wallet.address)
console.log('Private Key:', wallet.privateKey)
