// @flow
import { get } from 'lodash/fp';
import type { CartItem } from '../types/cart';


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
