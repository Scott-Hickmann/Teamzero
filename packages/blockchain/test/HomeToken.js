const HomeToken = artifacts.require('HomeToken');

contract('HomeToken', (accounts) => {
  const dao = accounts[1];
  const contributor = accounts[2];

  it('mints token upon partner payment', async () => {
    const HomeTokenInstance = await HomeToken.deployed();
    const amount = web3.utils.toWei('10');
    try {
      await HomeTokenInstance.mint.call(dao, amount, {
        from: contributor
      });
      assert.fail();
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'minting is restricted to DAO'
      );
    }
    await HomeTokenInstance.mint(dao, amount, { from: dao });
    const daoBalance = web3.utils.fromWei(
      await HomeTokenInstance.balanceOf(dao)
    );
    assert.equal(daoBalance, '10', 'minting is correct');
  });

  it('transfers token to contributor', async () => {
    const HomeTokenInstance = await HomeToken.deployed();
    let amount = web3.utils.toWei('20');
    try {
      await HomeTokenInstance.transfer.call(contributor, amount, {
        from: dao
      });
      assert.fail();
    } catch (error) {
      assert(error.message.indexOf('revert') >= 0, 'DAO is out of tokens');
    }
    amount = web3.utils.toWei('10');
    await HomeTokenInstance.transfer(contributor, amount, { from: dao });
    try {
      await HomeTokenInstance.transfer.call(contributor, amount, {
        from: dao
      });
      assert.fail();
    } catch (error) {
      assert(error.message.indexOf('revert') >= 0, 'DAO is out of tokens');
    }
    const daoBalance = web3.utils.fromWei(
      await HomeTokenInstance.balanceOf(dao)
    );
    const contributorBalance = web3.utils.fromWei(
      await HomeTokenInstance.balanceOf(contributor)
    );
    assert.equal(daoBalance, '0', 'transfer from DAO is correct');
    assert.equal(
      contributorBalance,
      '10',
      'transfer to contributor is correct'
    );
  });
});
