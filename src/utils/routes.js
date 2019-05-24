// @flow
import { get } from 'lodash/fp';
type ContentfulTypes = 'ContentfulProductCategory' | 'ContentfulProduct';

// Constants
export const ROUTE_PRODUCT_CATEGORY = '/kategori'
export const ROUTE_PRODUCT = '/produkt'

// Routes by contentful types
export const routesByContentfulType = {
  'ContentfulProductCategory': ROUTE_PRODUCT_CATEGORY,
  'ContentfulProduct': ROUTE_PRODUCT
}

// Utility tot get the route by contentful type
export const getRouteByType = (type: ContentfulTypes): string => {
  return get(type, routesByContentfulType)
}
