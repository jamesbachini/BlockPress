import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3 = {
    CONTRACT_ADDRESS: "0x7bd7e28D7DF97B26F799571B8Fdb674Aa90708eb",
    CONTRACT_ABI: [{"inputs": [{"internalType": "string","name": "_key","type": "string"},{"internalType": "string","name": "_value","type": "string"}],"name": "module","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "","type": "string"}],"name": "modules","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "string","name": "_key","type": "string"},{"internalType": "string","name": "_value","type": "string"}],"name": "post","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "postCount","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "postKeys","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "string","name": "","type": "string"}],"name": "posts","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_count","type": "uint256"}],"name": "recentPosts","outputs": [{"internalType": "string[]","name": "","type": "string[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "version","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"}],
    provider: null,
    signer: null,
    contract: null,
    account: null,
    initializeEthers: async function () {
        try {
            if (window.ethereum) {
                this.provider = new ethers.BrowserProvider(window.ethereum);
                this.signer = await this.provider.getSigner();
                this.contract = new ethers.Contract(this.CONTRACT_ADDRESS, this.CONTRACT_ABI, this.signer);
                this.account = this.signer.address;
                window.ethereum.on('accountsChanged', (accounts) => {
                    console.log('Accounts changed:', accounts);
                });
            } else {
                console.error('Please install MetaMask to use this application');
            }
        } catch (err) {
            console.error('Error initializing Web3:', err.message);
        }
    }
};

export default Web3;
