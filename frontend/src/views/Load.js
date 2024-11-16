import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from './../components/Header';
import Footer from './../components/Footer';
import Web3 from './../BlockPress-SDK';

const Load = () => {

  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [format, setFormat] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
        await Web3.initializeEthers();
        const passedSlug = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        const post = await Web3.fetchPost(passedSlug);
        setSlug(post.slug);
        setTitle(post.title);
        setImage(post.image);
        setFormat(post.format);
        setContent(post.content);
    };
    initialize();
  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center">
        <Header />
        <Footer />
        {/* Content container */}
        <div className="mt-20 p-6 max-w-screen-md w-full mx-auto">
            {error && (<div className="mb-4 text-red-600 font-semibold">{error}</div>)}
            <h1 className="text-3xl">{title}</h1>
            <div className="my-8">{content}</div>
        </div>
            
    </div>
  );
};

export default Load;