// @flow
import { CHECKOUT_KLARNA_CREATE_ORDER, CHECKOUT_KLARNA_FETCH_ORDER, CHECKOUT_KLARNA_RECEIVE_ORDER } from './definitions';

export const createKlarnaCheckout = (klarnaOrder: Object) => ({
  type: CHECKOUT_KLARNA_CREATE_ORDER,
  payload: { klarnaOrder }
});

export const getKlarnaCheckoutById = (orderId: string) => ({
  type: CHECKOUT_KLARNA_FETCH_ORDER,
  payload: { orderId }
});

export const receiveKlarnaCheckout = (checkout: Object, error: boolean = false) => ({
  type: CHECKOUT_KLARNA_RECEIVE_ORDER,
  payload: { checkout },
  error: error
});
