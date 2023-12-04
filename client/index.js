//entry point

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DarkModeProvider } from './components/DarkModeContext';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <DarkModeProvider>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </DarkModeProvider>,
  document.getElementById('app')
);
