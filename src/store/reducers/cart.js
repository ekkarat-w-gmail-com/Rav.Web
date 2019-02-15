import { set } from 'lodash/fp';
import { CART_SET_VISIBILITY } from '../actions/definitions';

const initialState = {
  items: [],
  visibility: false
}

export const cart = (state = initialState, { type, payload }) => {

  switch (type) {
    case CART_SET_VISIBILITY:
        return set('visibility', payload.visible, state);

    default:
      return state;
  }

}
