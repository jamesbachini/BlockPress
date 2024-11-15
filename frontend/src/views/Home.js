import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from './../components/Header';
import Footer from './../components/Footer';

const CONTRACT_ADDRESS = "0x2c9222CcB9aF492cE7209f3cDC26003C1186f0Ee";
const CONTRACT_ABI = [{"inputs":[{"internalType":"string","name":"_key","type":"string"},{"internalType":"string","name":"_value","type":"string"}],"name":"module","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"modules","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_key","type":"string"},{"internalType":"string","name":"_value","type":"string"}],"name":"post","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"postArray","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"postCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"posts","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];

const BlockPressApp = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [key, setKey] = useState('');
  const [code, setCode] = useState('');
  const [fetchedCode, setFetchedCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeEthers = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

          setProvider(provider);
          setContract(contract);
          setAccount(await signer.getAddress());

          window.ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0]);
          });
        } else {
          setError('Please install MetaMask to use this application');
        }
      } catch (err) {
        setError('Error initializing Web3: ' + err.message);
      }
    };

    initializeEthers();
  }, []);

  const storeCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!contract) throw new Error('Contract not initialized');
      const tx = await contract.module(key, code);
      await tx.wait();
      setKey('');
      setCode('');
      alert('Code stored successfully!');
    } catch (err) {
      setError('Error storing code: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!contract) throw new Error('Contract not initialized');
      const result = await contract.modules(key);
      setFetchedCode(result);
    } catch (err) {
      setError('Error fetching code: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const executeCode = () => {
    try {
      const executeFunction = new Function(fetchedCode);
      executeFunction();
    } catch (err) {
      setError('Error executing code: ' + err.message);
    }
  };
  
  const latestPosts = () => {
    return (
      <div>
        Test
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <Footer />
      {/* Content container */}
      <div className="mt-20 p-6 max-w-screen-md w-full mx-auto">
        {error && (
          <div className="mb-4 text-red-600 font-semibold">{error}</div>
        )}
        <p className="text-sm mb-6">Connected Account: {account || 'Not connected'}</p>
        <div className="grid gap-6">
          {/* Store Code Section */}
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">For You</h2>
            {latestPosts()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockPressApp;
