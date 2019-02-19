// @flow
import Client from 'shopify-buy';

// @docs https://shopify.github.io/js-buy-sdk/

const domain = process.env.SHOPIFY_STORE_NAME || ''

export const client = Client.buildClient({
  domain: `${domain}.myshopify.com`,
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN
});
