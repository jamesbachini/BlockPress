import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const basename = process.env.NODE_ENV === 'production' ? '/BlockPress' : '';
root.render(
  <HashRouter basename={basename}>
    <App />
  </HashRouter>,
);
