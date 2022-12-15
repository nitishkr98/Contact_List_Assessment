import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import getStore from './redux/store/store';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const { store, persistor } = getStore;

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
