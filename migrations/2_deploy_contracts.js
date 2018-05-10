var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var UserAttributeStore = artifacts.require("./UserAttributeStore.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(UserAttributeStore);
};
