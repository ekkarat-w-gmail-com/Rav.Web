import { call, put, takeLatest, all } from 'redux-saga/effects';

// Definitions
import { CHECKOUT_KLARNA_CREATE_ORDER, CHECKOUT_KLARNA_FETCH_ORDER, CHECKOUT_KLARNA_RECEIVE_ORDER } from '../actions/definitions';
import { receiveKlarnaCheckout } from '../actions';

// API
import { createCheckout, getCheckoutById } from '../../api/rav';

function* handleCreateKlarnaCheckout(action) {
  try {
    const { data } = yield call(createCheckout, action.payload.klarnaOrder);
    yield put(receiveKlarnaCheckout(data));
  } catch (error) {
    yield put(receiveKlarnaCheckout(error, true))
  }
}

function* handleFetchKlarnaCheckout(action) {
  try {
    const { data } = yield call(getCheckoutById, action.payload.orderId);
    yield put(receiveKlarnaCheckout(data));
  } catch (error) {
    yield put(receiveKlarnaCheckout(error, true))
  }
}

export function* checkoutSaga() {
  yield all([
    yield takeLatest(CHECKOUT_KLARNA_CREATE_ORDER, handleCreateKlarnaCheckout),
    yield takeLatest(CHECKOUT_KLARNA_FETCH_ORDER, handleFetchKlarnaCheckout),
  ]);
};
