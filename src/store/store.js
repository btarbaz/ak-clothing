import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
const middlewareLogger = store => next => action => {
  if (!action.type) {
    return next(action);
  }
  console.log('type', action.type);
  console.log('payload:', action.payload);
  console.log('current state', store.getState());

  // syncronos wait until action sends to reducers selector then move ahead
  next(action);

  console.log('next state', store.getState());
};

const middleWares = [middlewareLogger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
