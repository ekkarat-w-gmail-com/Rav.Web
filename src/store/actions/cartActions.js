// @flow

import { CART_SET_VISIBILITY, CHECKOUT_CREATED, CHECKOUT_FOUND, CART_ADD_VARIANT } from './definitions';

export const createCheckout = (checkout: any) => ({
  type: CHECKOUT_CREATED,
  payload: { checkout }
})

export const foundCheckout = (checkout: any) => ({
  type: CHECKOUT_FOUND,
  payload: { checkout }
})

export const addVariationToCart = (checkout: any) => ({
  type: CART_ADD_VARIANT,
  payload: { checkout }
})

export const setCartVisibility = (visible: boolean) => ({
  type: CART_SET_VISIBILITY,
  payload: { visible }
});
