import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  
import ContextProviderWrapper from './context/contextProvider'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProviderWrapper>
     <App />
    </ContextProviderWrapper>
  </React.StrictMode>
);


