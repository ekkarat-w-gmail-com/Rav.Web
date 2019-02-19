import { getOr, map, add } from 'lodash/fp';
import { createSelector } from 'reselect';

const lineItemsSelector = (store) => getOr([], 'cart.checkout.lineItems', store);

export const getCountInCart = createSelector(lineItemsSelector, lineItems => {
  let count = 0;

  map((lineItem) => {
    let quantity = getOr(0, 'quantity', lineItem);
    count = add(count, quantity);
  }, lineItems);

  return count;

});
