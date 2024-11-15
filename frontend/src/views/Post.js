import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from './../components/Header';
import Footer from './../components/Footer';
import Web3 from './../components/Web3';

const Post = () => {

  const [key, setKey] = useState('');
  const [post, setPost] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
        await Web3.initializeEthers();
    };
    initialize();
  }, []);

  const publish = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      if (!Web3.contract) throw new Error('Contract not initialized');
      const tx = await Web3.contract.post(key, post);
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
        <p className="text-sm mb-6">Connected Account: {Web3.account || 'Not connected'}</p>
        <div className="grid gap-6">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Publish</h2>
            <form onSubmit={publish} className="space-y-4">
              <div>
                <label className="block mb-2">Key:</label>
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').trim())}
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

export default Post;
