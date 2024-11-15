import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Module from './Module';
import Post from './Post';
import Docs from './Docs';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/module" element={<Module />} />
      <Route path="/post" element={<Post />} />
      <Route path="/docs" element={<Docs />} />
    </Routes>
  );
};

export default App;
