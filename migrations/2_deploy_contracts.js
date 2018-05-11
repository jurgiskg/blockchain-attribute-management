var UserAttributeStore = artifacts.require("./UserAttributeStore.sol");

module.exports = function(deployer) {
  deployer.deploy(UserAttributeStore);
};
