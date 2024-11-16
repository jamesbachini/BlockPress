import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from './../components/Header';
import Footer from './../components/Footer';
import Web3 from './../BlockPress-SDK';

const base = window.location.href.includes('/BlockPress') ? '/BlockPress' : '';

const BlockPressApp = () => {
  const [error, setError] = useState('');
  const [recentPosts, setRecentPosts] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
        await Web3.init();
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
    let html = '<div>';
    for (const i in recentPosts) {
      const p = recentPosts[i];
      html += `<a href="${base}/#/bp/${p.slug}"><div class="my-8">`;
      html += `<h2 class="text-xl">${p.title}</h2>`;
      html += `<p class="my-3">${p.content.substr(0,150)}</p>`;
      html += `<a href="${base}/#/bp/${p.slug}" class="text-sm text-gray-500">${base}/#/bp/${p.slug}</a>`;
      html += `</div></a>`;
    }
    html += `</div>`;
    return html;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <Footer />
      <div className="mt-20 p-6 max-w-screen-md w-full mx-auto">
        {error && (<div className="mb-4 text-red-600 font-semibold">{error}</div>)}
        <p className="text-sm mb-6">Connected Account: {Web3.account || 'Not connected'}</p>
        <div className="grid gap-6">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">For You</h2>
            <div dangerouslySetInnerHTML={{ __html: formatPosts() }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockPressApp;
