// @flow
import { get, set, flow } from 'lodash/fp';
import type { OrderLine } from '../types/checkout';
import type { CartItem } from '../types/cart';

const setTaxAmount = (orderLine: OrderLine) => {
  const amount = get('total_amount', orderLine) - get('total_amount', orderLine) * 10000 / (10000 + get('tax_rate', orderLine))
  return set('total_tax_amount', amount, orderLine);
}

export const createOrderLine = (product: any, quantity: number = 1): OrderLine => {

  const TAX_RATE = 2500;

  const unitPrice = get('salePrice', product) ? get('salePrice', product) : get('regularPrice', product);

  const totalAmount = quantity * unitPrice;
  const totalTaxAmount = totalAmount - totalAmount * 10000 / (10000 + TAX_RATE)

  let orderLine = {
    type: 'physical',
    reference: get('sku', product),
    name: get('name', product),
    quantity: quantity, // Non-negative. The item quantity.
    unit_price: unitPrice, // Minor units. Includes tax, excludes discount. (max value: 100000000)
    tax_rate: TAX_RATE,  // Non-negative. In percent, two implicit decimals. I.e 2500 = 25%. (max value: 10000)
    total_amount: totalAmount, // Includes tax and discount. Must match (quantity * unit_price) - total_discount_amount within ±quantity. (max value: 100000000)
    total_tax_amount: totalTaxAmount, // Must be within ±1 of total_amount - total_amount * 10000 / (10000 + tax_rate). Negative when type is discount.
    image_url: get('featuredImage.file.url', product)
  }

  if ( get('salePrice', product) ) {
    const amount = get('regularPrice', product) * quantity - get('salePrice', product) * quantity;

    const updateAmounts = flow([
      (orderLine) => set('total_amount', amount, orderLine),
      setTaxAmount,
      (orderLine) => set('total_discount_amount', amount, orderLine)
    ])
    return updateAmounts(orderLine);
  }

  return orderLine;

}

export const createCartItem = (product: any, quantity: number = 1): CartItem => {

  const TAX_RATE = 2500;

  const price = get('salePrice', product) ? get('salePrice', product) : get('regularPrice', product);

  const totalAmount = quantity * price;
  const totalTaxAmount = totalAmount - totalAmount * 10000 / (10000 + TAX_RATE)

  let cartItem: CartItem = {
    type: 'physical',
    reference: get('sku', product),
    name: get('name', product),
    quantity: quantity, // Non-negative. The item quantity.
    unitPrice: get('regularPrice', product), // Minor units. Includes tax, excludes discount. (max value: 100000000)
    unitDiscountPrice: get('salePrice', product),
    taxRate: TAX_RATE,  // Non-negative. In percent, two implicit decimals. I.e 2500 = 25%. (max value: 10000)
    totalAmount: totalAmount, // Includes tax and discount. Must match (quantity * unit_price) - total_discount_amount within ±quantity. (max value: 100000000)
    totalTaxAmount: totalTaxAmount, // Must be within ±1 of total_amount - total_amount * 10000 / (10000 + tax_rate). Negative when type is discount.
    imageUrl: get('featuredImage.file.url', product)
  }

  return cartItem;

}
