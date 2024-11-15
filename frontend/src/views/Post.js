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
  const [post, setPost] = useState('');
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

  const publish = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!contract) throw new Error('Contract not initialized');
      const tx = await contract.post(key, post);
      await tx.wait();
      setKey('');
      setPost('');
      alert('Post Published!');
    } catch (err) {
      setError('Error publishing: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Publish</h2>
            <form onSubmit={publish} className="space-y-4">
              <div>
                <label className="block mb-2">Key:</label>
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Post:</label>
                <textarea
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  className="w-full p-2 border rounded h-96"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Publishing...' : 'Publish'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockPressApp;
