import { ethers } from 'ethers';
import ReactDOM from 'react-dom/client';
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const dynamic = () => {
  return (<DynamicContextProvider
    settings={{
      environmentId: 'fdcf16d4-9ce2-4a39-a4cc-3f9e516e0abb',
      walletConnectors: [ EthereumWalletConnectors ],
    }}>
    <DynamicWidget />
  </DynamicContextProvider>);
}

const SDK = {
    version: "0.1.3",
    contractAddress: "0xe0D8976c12bb39E551C835eBFF1109f8E42Be2FE",
    contractABI: [{"inputs": [{"internalType": "string","name": "_slug","type": "string"},{"internalType": "string","name": "_title","type": "string"},{"internalType": "string","name": "_description","type": "string"},{"internalType": "string","name": "_format","type": "string"},{"internalType": "string","name": "_code","type": "string"}],"name": "module","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_slug","type": "string"},{"internalType": "string","name": "_title","type": "string"},{"internalType": "string","name": "_image","type": "string"},{"internalType": "string","name": "_format","type": "string"},{"internalType": "string","name": "_content","type": "string"}],"name": "post","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "moduleCount","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "moduleKeys","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "string","name": "","type": "string"}],"name": "modules","outputs": [{"internalType": "string","name": "slug","type": "string"},{"internalType": "string","name": "title","type": "string"},{"internalType": "string","name": "description","type": "string"},{"internalType": "string","name": "format","type": "string"},{"internalType": "string","name": "code","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "postCount","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "postKeys","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "string","name": "","type": "string"}],"name": "posts","outputs": [{"internalType": "string","name": "slug","type": "string"},{"internalType": "string","name": "title","type": "string"},{"internalType": "string","name": "image","type": "string"},{"internalType": "string","name": "format","type": "string"},{"internalType": "string","name": "content","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_count","type": "uint256"}],"name": "recentModules","outputs": [{"components": [{"internalType": "string","name": "slug","type": "string"},{"internalType": "string","name": "title","type": "string"},{"internalType": "string","name": "description","type": "string"},{"internalType": "string","name": "format","type": "string"},{"internalType": "string","name": "code","type": "string"}],"internalType": "struct BlockPress.Module[]","name": "","type": "tuple[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_count","type": "uint256"}],"name": "recentPosts","outputs": [{"components": [{"internalType": "string","name": "slug","type": "string"},{"internalType": "string","name": "title","type": "string"},{"internalType": "string","name": "image","type": "string"},{"internalType": "string","name": "format","type": "string"},{"internalType": "string","name": "content","type": "string"}],"internalType": "struct BlockPress.Post[]","name": "","type": "tuple[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "version","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"}],
    provider: null,
    signer: null,
    contract: null,
    account: null,
    explorer: null,
    web3auth: null,
    init: async function () {
        try {
            if (window.ethereum) {
              this.provider = new ethers.BrowserProvider(window.ethereum);
            } else {
              const container = document.createElement('div');
              container.id = 'dynamic-widget-container';
              document.body.appendChild(container);
              const root = ReactDOM.createRoot(container);
              root.render(dynamic());
            }
            const network = await this.provider.getNetwork();
            if (network.chainId === 11155111) this.explorer = 'https://eth-sepolia.blockscout.com/';
            if (network.chainId === 4801) this.explorer = 'https://worldchain-sepolia.explorer.alchemy.com/';
            if (network.chainId === 545) {
              this.explorer = 'https://evm-testnet.flowscan.io/';
              this.contract = '0x484Ec30Feff505b545Ed7b905bc25a6a40589181';
            }
            if (network.chainId === 1442) this.explorer = 'https://explorer-ui.cardona.zkevm-rpc.com/';
            if (network.chainId === 5003) this.explorer = 'https://explorer.sepolia.mantle.xyz/';
            if (network.chainId === 31) this.explorer = 'https://explorer.testnet.rootstock.io/';
            if (network.chainId === 2810) this.explorer = 'https://explorer-holesky.morphl2.io/';
            if (network.chainId === 59141) this.explorer = 'https://explorer.sepolia.linea.build/';
            this.signer = await this.provider.getSigner();
            this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.signer);
            this.account = this.signer.address;
            window.ethereum.on('accountsChanged', (accounts) => {
                console.log('Accounts changed:', accounts);
            });

        } catch (err) {
            console.error('Error initializing Web3:', err.message);
        }
    },
    fetchPost: async function (slug) {
      return await this.contract.posts(slug);
    },
};

export default SDK;
