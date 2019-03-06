import { set, concat } from 'lodash/fp';
import { CART_SET_VISIBILITY, CART_ADD_VARIANT, CART_UPDATE_QUANTITY, CART_REMOVE_ITEM } from '../actions/definitions';

const initialState = {
  items: [],
  visibility: false
}

export const cart = (state = initialState, { type, payload }) => {

  switch (type) {

    case CART_ADD_VARIANT:
      return {
        ...state,
        items: concat(payload.product, state.items)
      }
    case CART_UPDATE_QUANTITY:
    case CART_REMOVE_ITEM:
      return set('checkout', payload.checkout, state);

    case CART_SET_VISIBILITY:
      return set('visibility', payload.visible, state);

    default:
      return state;
  }

}
