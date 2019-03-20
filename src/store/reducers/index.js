import { combineReducers } from 'redux';

import { cart } from './cart'
import { checkout } from './checkout';

export const reducer = combineReducers({
  cart,
  checkout
})
