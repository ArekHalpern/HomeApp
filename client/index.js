// Entry point

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { DarkModeProvider } from './components/DarkModeContext';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const container = document.getElementById('app');
const root = createRoot(container);


root.render(
  <DarkModeProvider>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </DarkModeProvider>
);
