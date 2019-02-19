import { set, merge } from 'lodash/fp';
import { CART_SET_VISIBILITY, CHECKOUT_FOUND, CHECKOUT_CREATED, CART_ADD_VARIANT} from '../actions/definitions';

const initialState = {
  checkout: {},
  visibility: false
}

export const cart = (state = initialState, { type, payload }) => {

  switch (type) {

    case CHECKOUT_CREATED:
      return set('checkout', payload.checkout, state);

    case CHECKOUT_FOUND:
      return set('checkout', payload.checkout, state);

    case CART_ADD_VARIANT:
      return set('checkout.lineItems', payload.item, state);

    case CART_SET_VISIBILITY:
      return set('visibility', payload.visible, state);

    default:
      return state;
  }

}
