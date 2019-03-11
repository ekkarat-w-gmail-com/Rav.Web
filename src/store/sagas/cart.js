import { call, put, takeLatest, all } from 'redux-saga/effects';
import { has } from 'lodash/fp';

// Definitions
import { CART_FETCH, CART_ADD_VARIANT } from '../actions/definitions';
import { receiveCart } from '../actions/cartActions';

// API
import { addToCart, fetchCart } from '../../api/rav';

function* handleFetchOfCart(action) {
  try {
    const { data } = yield call(fetchCart);
    console.log('handleFetchOfCart -->', data);
    yield put(receiveCart(data));
  } catch (error) {
    yield put(receiveCart(error, true))
  }
}

function* handleAddToCart(action) {
  try {
    const { data } = yield call(addToCart, action.payload.product);
    yield put(receiveCart(data));
  } catch (error) {
    yield put(receiveCart(error, true))
  }
}

export function* cartSaga() {
  yield all([
    yield takeLatest(CART_FETCH, handleFetchOfCart),
    yield takeLatest(CART_ADD_VARIANT, handleAddToCart),
  ]);
};
