import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from './../components/Header';
import Footer from './../components/Footer';
import Web3 from './../BlockPress-SDK';

const Post = () => {

  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [format, setFormat] = useState('text');
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
      const tx = await Web3.contract.post(slug, post);
      await tx.wait();
      alert('Post Published!');
      window.location = `/#/p/${slug}`;
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
              <div className="t-sm text-gray-500">https://blockpress.com/#/p/{slug}/</div>
              <div>
                <span
                  onClick={() => setFormat('text')}
                  className={`text-sm cursor-pointer ${format === 'text' ? 'text-gray-900' : 'text-gray-500'}`}
                >Text</span>
                <span
                  onClick={() => setFormat('html')}
                  className={`text-sm cursor-pointer px-3 ${format === 'html' ? 'text-gray-900' : 'text-gray-500'}`}
                >HTML</span>
                <span
                  onClick={() => setFormat('markdown')}
                  className={`text-sm cursor-pointer ${format === 'markdown' ? 'text-gray-900' : 'text-gray-500'}`}
                >Markdown</span>
                <textarea
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  className="w-full p-2 border rounded h-96"
                  required
                />
              </div>
              <div>
                <button>Add Media</button>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Publishing...' : 'Publish'}
                </button>
              </div>              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
