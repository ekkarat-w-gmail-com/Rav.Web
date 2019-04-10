// @flow
import React from 'react';
import { isEmpty, map, get } from 'lodash/fp';

import { ProductCard  } from '../Cards';

import { ProductListWrapper } from './styles';

type Props = {
  products: Array<any>,
  thumbnailSource: string,
  excerptSource: string,
  columns?: number
}

export const ProductList = ({ products, columns, thumbnailSource, excerptSource }: Props) => {

  if ( !products || isEmpty(products) ) {
    return null;
  }

  const productList = map(({ node }) => (
    <ProductCard
      key={get('id', node)}
      title={get('name', node)}
      to={`/produkt/${get('slug', node)}`}
      excerpt={get(excerptSource, node)}
      thumbnail={get(thumbnailSource, node)} />
  ), products);

  return (
    <ProductListWrapper columns={columns}>
      {productList}
    </ProductListWrapper>
  )

};

ProductList.defaultProps = {
  columns: 4
}
