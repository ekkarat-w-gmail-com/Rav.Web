import { getOr, map, add } from 'lodash/fp';
import { createSelector } from 'reselect';

const orderItemsSelector = (store) => getOr([], 'cart.data.items', store);

export const getCountInCart = createSelector(orderItemsSelector, orderItems => {
  let count = 0;

  map((item) => {
    let quantity = getOr(0, 'quantity', item);
    count = add(count, quantity);
  }, orderItems);

  return count;

});

export const getCartTotalAmount = createSelector(orderItemsSelector, orderItems => {
  let count = 0;

  map((item) => {
    let quantity = getOr(0, 'total_amount', item);
    count = add(count, quantity);
  }, orderItems);

  return count;
})

export const getCartTotalTaxAmount = createSelector(orderItemsSelector, orderItems => {
  let total = 0;

  map((item) => {
    let amount = getOr(0, 'total_tax_amount', item);
    total = add(total, amount);
  }, orderItems);

  return total;
})

export const getDiscountTotalAmount = createSelector(orderItemsSelector, orderItems => {
  let total = 0;

  map((item) => {
    let amount = getOr(0, 'total_discount_amount', item);
    total = add(total, amount);
  }, orderItems);

  return total;
})
