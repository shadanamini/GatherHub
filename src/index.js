import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConferenceProvider } from "../src/pages/ConferenceContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConferenceProvider>
      <App />
    </ConferenceProvider>
  </React.StrictMode>
);