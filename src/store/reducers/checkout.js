import { RECEIVE_ORDER } from '../actions/definitions';

const initialState = {}

export const checkout = (state = initialState, { type, payload }) => {

  switch (type) {

    case RECEIVE_ORDER:
      return payload.order;

    default:
      return state;
  }

}
