import React from 'react'
import { Provider } from 'react-redux'

import { createStore, sagaMiddleware } from './index';
import { rootSaga } from './sagas';

const store = createStore();

// Run saga
sagaMiddleware.run(rootSaga);

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <Provider store={store}>{element}</Provider>
