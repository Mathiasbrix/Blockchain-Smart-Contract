var BankingContract = artifacts.require("./Banking.sol");

module.exports = function (deployer) {
  deployer.deploy(BankingContract);
};
