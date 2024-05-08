const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config(); // For loading environment variables

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 11155111, // Sepolia's network id
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};