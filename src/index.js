import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style/App.scss';
import './Style/App-tablet.scss';
import './Style/App-laptop.scss';
import './Style/App-desktop.scss';
import App from './App';
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

