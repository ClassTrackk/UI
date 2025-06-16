import { initThemeMode } from "flowbite-react";
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App.tsx";
import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider>
      <PersistGate loading={null} persistor={persistor}>
        
          <App />
  
      </PersistGate>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

initThemeMode();



