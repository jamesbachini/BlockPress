import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Module from './views/Module';
import Post from './views/Post';
import Docs from './views/Docs';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/module" element={<Module />} />
      <Route path="/post" element={<Post />} />
      <Route path="/docs" element={<Docs />} />
    </Routes>
  );
};

export default App;
