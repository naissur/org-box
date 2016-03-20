import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { App } from './App';

import { configureStore } from './store';

const store = configureStore();

if (window) window.store = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));
