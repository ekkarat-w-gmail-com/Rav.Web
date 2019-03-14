// @flow
export type CartItem = {
  reference: string,
  name: string,
  quantity: number,
  unitPrice: number,
  unitDiscountPrice: number,
  taxRate: number,
  totalAmount?: number,
  totalDiscountAmount?: number,
  totalTaxAmount?: number
}

export type Cart = {
  items: Array<CartItem>,
  totalAmount: number,
  totalTaxAmount: number,
  totalDiscountAmount: number
}
