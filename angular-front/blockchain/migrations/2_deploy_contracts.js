var UserRegister = artifacts.require("./UserRegister.sol");

module.exports = function(deployer) {
  deployer.deploy(UserRegister, 1000000000000000);
};
