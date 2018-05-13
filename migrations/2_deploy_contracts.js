var UserAttributeStore = artifacts.require("./UserAttributeStore.sol");
var ServiceRegister = artifacts.require("./ServiceRegister.sol");

module.exports = function(deployer) {
  deployer.deploy(UserAttributeStore);
  deployer.deploy(ServiceRegister);
};
