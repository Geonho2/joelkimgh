import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const meta = document.createElement('meta');
meta.name = "theme-color";
meta.content = "#000A13";
// meta.content = "#77D6B4";
document.getElementsByTagName('head')[0].appendChild(meta);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);