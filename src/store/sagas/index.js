import { fork } from 'redux-saga/effects';

import { checkoutSaga } from './checkout';

export function* rootSaga() {
  yield fork(checkoutSaga)
  // code after fork-effect
}
