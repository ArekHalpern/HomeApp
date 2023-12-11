// Entry point
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from './components/DarkModeContext';
import store from './store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <DarkModeProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </DarkModeProvider>
);
