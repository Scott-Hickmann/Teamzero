import { useEffect, useState } from 'react';
import Web3 from 'web3';

export function useWeb3() {
  const [account, setAccount] = useState<string | undefined>();

  // TODO: Smart contract logic
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);
    }

    load();
  }, [account, setAccount]);

  return { account };
}
