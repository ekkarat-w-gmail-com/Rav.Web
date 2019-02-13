import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'

// Reducer
import { reducer } from './reducers';

// Middlewares
export const sagaMiddleware = createSagaMiddleware()

// initialState
const initialState = {};

// Create store function
export const createStore = () => reduxCreateStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  )
);
