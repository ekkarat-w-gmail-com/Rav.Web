// @flow

import { CART_SET_VISIBILITY } from './definitions';

export const setCartVisibility = (visible: boolean) => ({
  type: CART_SET_VISIBILITY,
  payload: { visible }
});
