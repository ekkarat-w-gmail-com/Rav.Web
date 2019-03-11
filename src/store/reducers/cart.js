import { set } from 'lodash/fp';
import { CART_SET_VISIBILITY, CART_RECEIVE } from '../actions/definitions';

const initialState = {
  data: {
    items: [],
    total_amount: 0,
    total_tax_amount: 0,
    total_discount_amount: 0,
  },
  visibility: false
}

export const cart = (state = initialState, { type, payload }) => {

  switch (type) {

    case CART_RECEIVE:
      return set('data', payload.cart, state);

    case CART_SET_VISIBILITY:
      return set('visibility', payload.visible, state);

    default:
      return state;
  }

}
