import { get } from 'lodash/fp';
import { CHECKOUT_KLARNA_RECEIVE_ORDER } from '../actions/definitions';

const initialState = {}

export const checkout = (state = initialState, { type, payload }) => {

  switch (type) {

    case CHECKOUT_KLARNA_RECEIVE_ORDER:
      return get('response.data.error_code', payload.checkout) ? state : payload.checkout;

    default:
      return state;

  }

}
