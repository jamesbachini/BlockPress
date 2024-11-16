import React, { useState, useEffect } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import Web3 from './../BlockPress-SDK';

const base = window.location.href.includes('/BlockPress') ? '/BlockPress' : '';

const escapeHtml = (html) => {
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

const BlockPressApp = () => {
  const [error, setError] = useState('');
  const [recentModules, setRecentModules] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
        await Web3.init();
        try {
          if (!Web3.contract) throw new Error('Contract not initialized');
          const posts = await Web3.contract.recentModules(20);
          setRecentModules(posts);
        } catch (err) {
          setError('Error publishing: ' + err.message);
        }
    };
    initialize();
  }, []);

  const formatModules = () => {
    let html = '<div>';
    for (const i in recentModules) {
      const p = recentModules[i];
      html += `<div class="my-8">`;
      html += `<h2 class="text-lg">${p.title}</h2>`;
      html += `<p class="my-3">${p.description}</p>`;
      html += `<pre class="my-3 text-xs max-h-32 border overflow-y-auto overflow-x-hidden"><code>${escapeHtml(p.code)}</code></pre>`;
      html += `<pre class="my-3 text-xs text-gray-400"><code>bpImport('${p.slug}');</code></pre>`;
      html += `</div><hr />`;
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
            <h2 className="text-xl font-semibold mb-4">Shared Modules</h2>
            <div dangerouslySetInnerHTML={{ __html: formatModules() }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockPressApp;
