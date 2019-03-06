// @flow

import { CART_SET_VISIBILITY, CART_ADD_VARIANT, CART_UPDATE_QUANTITY, CART_REMOVE_ITEM } from './definitions';

export const addProductToCart = (product: any) => ({
  type: CART_ADD_VARIANT,
  payload: { product }
})

export const updateItemQuantity = (checkout: any) => ({
  type: CART_UPDATE_QUANTITY,
  payload: { checkout }
})

export const removeItemFromCart = (checkout: any) => ({
  type: CART_REMOVE_ITEM,
  payload: { checkout }
})

export const setCartVisibility = (visible: boolean) => ({
  type: CART_SET_VISIBILITY,
  payload: { visible }
});
