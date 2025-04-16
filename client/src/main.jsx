import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import App from './App.jsx';
import store from './store'; // Import the Redux store
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap App in Provider and pass the store */}
      <App />
    </Provider>
  </StrictMode>,
);