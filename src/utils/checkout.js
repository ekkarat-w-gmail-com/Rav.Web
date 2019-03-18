// @flow

import type { CartItem } from '../types/cart';

export const createKlarnaOrder = (billingInfo: Object, cartItems: Array<CartItem>) => {

  const billingAddress = {
    "given_name": "Testperson-se",
    "family_name": "Approved",
    "email": "youremail@email.com",
    "street_address": "Stårgatan 1",
    "postal_code": "12345",
    "city": "Ankeborg",
    "phone": "+46765260000",
    "country": "se"
  }

  return {
    billing_address: billingAddress,
    order_amount: 0,
    order_tax_amount: 0,
    order_lines: cartItems
  }

}
