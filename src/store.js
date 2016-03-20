import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import createLogger from 'redux-logger';
const logger = createLogger();


export function configureStore() {
  const middlewares = [thunk, logger];

  const store = applyMiddleware(...middlewares)(createStore)(rootReducer);

  return store;
}
