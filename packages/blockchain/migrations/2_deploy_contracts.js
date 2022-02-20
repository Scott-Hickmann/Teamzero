const HomeToken = artifacts.require('HomeToken');
const Micropayments = artifacts.require('Micropayments');

module.exports = async function (deployer) {
  const accounts = await web3.eth.getAccounts();
  await deployer.deploy(Micropayments, accounts[0], 5000, [0], 10000);
  await deployer.deploy(HomeToken, 0);
  const dao = accounts[1];
  const HomeTokenInstance = await HomeToken.deployed();
  HomeTokenInstance.setupMinter(dao);
};
