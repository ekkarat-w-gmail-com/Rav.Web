import { set } from 'lodash/fp';
import { CART_SET_VISIBILITY, CHECKOUT_FOUND, CHECKOUT_CREATED, CART_ADD_VARIANT, CART_UPDATE_QUANTITY, CART_REMOVE_ITEM } from '../actions/definitions';

const initialState = {
  checkout: {},
  visibility: false
}

export const cart = (state = initialState, { type, payload }) => {

  switch (type) {

    case CHECKOUT_CREATED:
    case CHECKOUT_FOUND:
    case CART_ADD_VARIANT:
    case CART_UPDATE_QUANTITY:
    case CART_REMOVE_ITEM:
      return set('checkout', payload.checkout, state);

    case CART_SET_VISIBILITY:
      return set('visibility', payload.visible, state);

    default:
      return state;
  }

}
