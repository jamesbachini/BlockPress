import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from './../components/Header';
import Footer from './../components/Footer';
import Web3 from './../BlockPress-SDK';

const BlockPressApp = () => {
  const [error, setError] = useState('');
  const [recentPosts, setRecentPosts] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
        await Web3.initializeEthers();
        try {
          if (!Web3.contract) throw new Error('Contract not initialized');
          const posts = await Web3.contract.recentPosts(20);
          setRecentPosts(posts);
        } catch (err) {
          setError('Error publishing: ' + err.message);
        }
    };
    initialize();
  }, []);

  const formatPosts = () => {
    console.log(recentPosts);

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
        <p className="text-sm mb-6">Connected Account: {Web3.account || 'Not connected'}</p>
        <div className="grid gap-6">
          {/* Store Code Section */}
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">For You</h2>
            {formatPosts()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockPressApp;
