// @flow
import { get } from 'lodash/fp';

// Types
type ContentfulTypes = 'ContentfulProductCategory' | 'ContentfulProduct' | 'ContentfulBrand' | 'ContentfulPage';

// Constants
export const ROUTE_PRODUCT_CATEGORY = '/kategori';
export const ROUTE_PRODUCT = '/produkt';
export const ROUTE_BRAND = '/varumärke';
export const ROUTE_PAGE = '';

// Routes by contentful types
export const routesByContentfulType = {
  'ContentfulProductCategory': ROUTE_PRODUCT_CATEGORY,
  'ContentfulProduct': ROUTE_PRODUCT,
  'ContentfulBrand': ROUTE_BRAND,
  'ContentfulPage': ROUTE_PAGE
}

// Utility tot get the route by contentful type
export const getRouteByType = (type: ContentfulTypes): string => {
  return get(type, routesByContentfulType)
}
