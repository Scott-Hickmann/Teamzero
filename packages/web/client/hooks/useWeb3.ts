import { useRef } from 'react';
import Web3 from 'web3';

export function useWeb3() {
  const web3 = useRef(new Web3(Web3.givenProvider || 'http://localhost:7545'));

  return { web3: web3.current };
}
