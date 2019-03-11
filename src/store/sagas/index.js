import { fork } from 'redux-saga/effects';

import { cartSaga } from './cart';

export function* rootSaga() {
  yield fork(cartSaga)
}
