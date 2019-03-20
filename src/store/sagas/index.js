import { fork } from 'redux-saga/effects';

import { cartSaga } from './cart';
import { checkoutSaga } from './checkout';


export function* rootSaga() {
  yield fork(cartSaga)
  yield fork(checkoutSaga)
}
