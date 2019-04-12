// @flow
import { get, map } from 'lodash/fp';

import { renameKeys } from './formatting';

// Type
import type { CartItem } from '../types/cart';

export const formatKlarnaOrder = (billingInfo: Object, cartItems: Array<CartItem>, orderAmount: number, taxAmount: number) => {

  // Set billingAddress
  const billingAddress = {
    given_name: get('firstName', billingInfo),
    family_name: get('lastName', billingInfo),
    email: get('emailAddress', billingInfo),
    street_address: get('streetAddress', billingInfo),
    postal_code: get('zip', billingInfo),
    city: get('city', billingInfo),
    phone: get('phone', billingInfo),
    country: "se"
  }

  // Update precicions of amounts
  const updatedPrecicions = map((cartItem) => {
    return {
      ...cartItem,
      unitPrice: cartItem.unitPrice * 100,
      unitDiscountPrice: cartItem.unitDiscountPrice * 100,
      totalAmount: cartItem.totalAmount * 100,
      totalTaxAmount: cartItem.totalTaxAmount * 100,
      totalDiscountAmount: cartItem.totalDiscountAmount * 100
    }
  }, cartItems);

  // Rename object keys
  const orderLineKeys = {
    unitPrice: 'unit_price',
    totalDiscountAmount: 'total_discount_amount',
    taxRate: 'tax_rate',
    totalAmount: 'total_amount',
    totalTaxAmount: 'total_tax_amount',
    imageUrl: 'image_url'
  }

  const renamedOrderLines = map((cartItem) => renameKeys(cartItem, orderLineKeys), updatedPrecicions);

  return {
    billing_address: billingAddress,
    order_amount: orderAmount * 100,
    order_tax_amount: taxAmount * 100,
    order_lines: renamedOrderLines
  }

}
