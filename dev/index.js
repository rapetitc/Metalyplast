import React from 'react';
import ReactDOM from 'react-dom/client';

import { BehaviorsProvider } from './Context/Behaviors';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BehaviorsProvider>
      <App />
    </BehaviorsProvider>
  </React.StrictMode>
);