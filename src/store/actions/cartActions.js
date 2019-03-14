// @flow
import type { CartItem } from '../../types/cart';
import { CART_SET_VISIBILITY, CART_ADD_VARIANT, CART_UPDATE_QUANTITY, CART_REMOVE_ITEM, CART_FETCH, CART_RECEIVE } from './definitions';

export const getCart = () => ({
  type: CART_FETCH
});

export const receiveCart = (cart: Object, error: boolean = false) => ({
  type: CART_RECEIVE,
  payload: { cart },
  error
});

export const addProductToCart = (cartItem: CartItem) => ({
  type: CART_ADD_VARIANT,
  payload: { cartItem }
})

export const updateItemQuantity = (id: string, quantity: number) => ({
  type: CART_UPDATE_QUANTITY,
  payload: { id, quantity }
})

export const removeItemFromCart = (id: string) => ({
  type: CART_REMOVE_ITEM,
  payload: { id }
})

export const setCartVisibility = (visible: boolean) => ({
  type: CART_SET_VISIBILITY,
  payload: { visible }
});
