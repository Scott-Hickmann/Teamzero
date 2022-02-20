import { useEffect } from 'react';
import Web3 from 'web3';

let web3: Web3;

export function useWeb3() {
  useEffect(() => {
    web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
  }, []);

  return { web3 };
}
