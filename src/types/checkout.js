// @flow

export type OrderLine = {
  type: 'physical' | 'discount' | 'shipping_fee' | 'sales_tax' | 'digital' | 'gift_card' | 'store_credit' | 'surcharge',
  reference: string, // Article number, SKU or similar.
  name: string, // Descriptive item name.
  quantity: number, // Non-negative. The item quantity.
  unit_price: number, // Minor units. Includes tax, excludes discount. (max value: 100000000)
  tax_rate: number,  // Non-negative. In percent, two implicit decimals. I.e 2500 = 25%. (max value: 10000)
  total_amount: number, // Includes tax and discount. Must match (quantity * unit_price) - total_discount_amount within ±quantity. (max value: 100000000)
  total_tax_amount: number, // Must be within ±1 of total_amount - total_amount * 10000 / (10000 + tax_rate). Negative when type is discount.
}

export type CreateOrder = {
  purchase_country: string, // ISO 3166 alpha-2 purchase country.
  purchase_currency: string, // ISO 4217 purchase currency.
  locale: string, // RFC 1766 customer's locale.
  order_amount: number, // Non-negative, minor units. Total amount of the order, including tax and any discounts.
  order_tax_amount: number, // Non-negative, minor units. The total tax amount of the order.
  orders_lines: Array<OrderLine>,
  merchant_urls: {
    terms: string,
    cancellation_terms: string,
    checkout: string,
    confirmation: string,
    push: string,
  }
}
