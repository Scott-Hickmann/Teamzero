const Micropayments = artifacts.require('Micropayments');

module.exports = async function (deployer) {
  const accounts = await web3.eth.getAccounts();
  await deployer.deploy(Micropayments, accounts[0], 5000, [0], 10000);
};
