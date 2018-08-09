var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "YOUR MNEMONIC WORDS";

module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/YOUR-ACCOUNT-INFURA")
      },
      network_id: 4
    }
  }
};
