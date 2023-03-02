// import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import INFURA_ID from './infuraId';

const Web3Modal = require('web3modal');

const web3Modal = new Web3Modal({
  network: 'mainnet', // or 'rinkeby' or other Ethereum network
  cacheProvider: true,
  providerOptions: {
    metamask: {
      id: 'injected',
      name: 'MetaMask',
      logo: '/assets/images/metamask.png',
    },
    walletconnect: {
      id: 'walletconnect',
      name: 'WalletConnect',
      logo: '/assets/images/walletconnect.svg',
      infuraId: INFURA_ID,
    },
    // Add other supported wallets here
  },
});

module.exports = web3Modal;
