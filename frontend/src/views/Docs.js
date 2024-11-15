import React, { useState, useEffect } from 'react';

import Header from './../components/Header';
import Footer from './../components/Footer';

const Docs = () => {
  return (
    <div>
      <Header />
      <Footer />
      <div className="mt-20 p-6 max-w-screen-md w-full mx-auto">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Docs</h2>
          <p>Coming Soon</p>
        </div>
      </div>
    </div>
  );
};

export default Docs;
