var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var FoodStore = artifacts.require("./FoodStore.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(FoodStore);
};
