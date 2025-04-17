import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx';
import store, { persistor } from './store'; // Import the Redux store
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}> 
          <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
);