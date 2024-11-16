import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from './../components/Header';
import Footer from './../components/Footer';
import Web3 from './../BlockPress-SDK';

const BlockPressApp = () => {
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [format, setFormat] = useState('');
  const [code, setCode] = useState('');
  const [fetchedCode, setFetchedCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
        await Web3.initializeEthers();
    };
    initialize();
  }, []);

  const storeCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!Web3.contract) throw new Error('Contract not initialized');
      const tx = await Web3.contract.module(slug, title, description, format, code);
      await tx.wait();
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
      if (!Web3.contract) throw new Error('Contract not initialized');
      const result = await Web3.contract.modules(slug);
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
            <h2 className="text-xl font-semibold mb-4">Create Module</h2>
            <form onSubmit={storeCode} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').trim());
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Description:</label>
                <textarea
                  value={code}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded h-16"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Code:</label>
                <textarea
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setFormat(`js-${Web3.version}`);
                  }}
                  className="w-full p-2 border rounded h-32"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Storing...' : 'Publish Code'}
              </button>
            </form>
          </div>

          {/* Fetch & Execute Code Section */}
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Fetch & Execute Code</h2>
            <form onSubmit={fetchCode} className="space-y-4">
              <div>
                <label className="block mb-2">Key:</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Fetching...' : 'Fetch Code'}
              </button>
            </form>
            {fetchedCode && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Fetched Code:</h3>
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                  {fetchedCode}
                </pre>
                <button
                  onClick={executeCode}
                >
                  Execute Code
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockPressApp;
