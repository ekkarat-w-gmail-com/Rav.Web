import { call, put, takeLatest, all } from 'redux-saga/effects';

// Definitions
import { CHECKOUT_KLARNA_CREATE_ORDER, CHECKOUT_KLARNA_FETCH_ORDER, CHECKOUT_KLARNA_CONFIRM_ORDER } from '../actions/definitions';
import { receiveKlarnaCheckout } from '../actions';

// API
import { createCheckout, getCheckoutById, confirmCheckoutPurchase } from '../../api/rav';

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

function* handleConfirmCheckout(action) {
  try {
    yield call(confirmCheckoutPurchase, action.payload.orderId);
  } catch (error) {
    console.log(error);
  }
}

export function* checkoutSaga() {
  yield all([
    yield takeLatest(CHECKOUT_KLARNA_CREATE_ORDER, handleCreateKlarnaCheckout),
    yield takeLatest(CHECKOUT_KLARNA_FETCH_ORDER, handleFetchKlarnaCheckout),
    yield takeLatest(CHECKOUT_KLARNA_CONFIRM_ORDER, handleConfirmCheckout)
  ]);
};
