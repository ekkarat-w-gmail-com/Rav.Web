import { call, put, takeLatest, all } from 'redux-saga/effects';
import { has } from 'lodash/fp';

// Definitions
import { CREATE_ORDER } from '../actions/definitions';

// API
import { createOrder } from '../../api/klarna';

// Actions
import { receiveOrder } from '../actions/checkoutActions';

function* handleCreateOrder(action) {
  try {
    const { data } = yield call(createOrder)
    if ( has('error_code', data) ) {
      throw data;
    }
    yield put(receiveOrder(data));
  } catch (error) {
    yield put(receiveOrder(error, true))
  }
}

export function* checkoutSaga() {
  yield all([
    yield takeLatest(CREATE_ORDER, handleCreateOrder),
  ]);
};
