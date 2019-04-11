import { get, subtract, find } from 'lodash/fp';
import { createSelector } from 'reselect';

export const getProductInitialStock = (store, props) => get('data.product.stockQuantity', props) || 0;
export const getProductSKU = (store, props) => get('data.product.sku', props) || 0;
export const getCartItems = (store, props) => get('cart.data.items', store);

export const getStockQuantity = createSelector([getProductInitialStock, getProductSKU, getCartItems], (productQuantity, sku, cartItems) => {

  const productInCart = find((item) => item.reference === sku, cartItems);

  if ( productInCart ) {
    const quantityInCart = get('quantity', productInCart);
    const newQuantity = subtract(productQuantity, quantityInCart);
    return newQuantity;
  }

  return productQuantity;

});
