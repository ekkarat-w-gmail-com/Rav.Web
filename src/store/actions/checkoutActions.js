// @flow
import { CREATE_ORDER, RECEIVE_ORDER } from './definitions';


export const createOrder = (info: Object) => ({
  type: CREATE_ORDER,
  payload: { info }
});

export const receiveOrder = (order: Object, isError: boolean = false) => ({
  type: RECEIVE_ORDER,
  payload: { order },
  error: isError
})
