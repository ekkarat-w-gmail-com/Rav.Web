// @flow
import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components';
import { get } from 'lodash/fp';

// components
import Layout from "../components/layout"
import { ProductList } from '../components/ProductList';

type Props = {
  data: {
    category: {
      edges: Array<any>
    }
  }
}

const ProductCategoryPage = ({ data }: Props) => {
  const category = get('category.edges[0].node', data);

  return (
    <Layout>
      <HeaderContainer>
        <CategoryTitle>{get('title', category)}</CategoryTitle>
        <CategoryDescription>{get('description', category)}</CategoryDescription>
        <ProductList
          keySource={'id'}
          titleSource={'title'}
          hrefPrefix={'/product/'}
          hrefSource={'handle'}
          thumbnailSource={'images[0].originalSrc'}
          excerptSource={'description'}
          products={get('products', category)}
         />
      </HeaderContainer>

    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {

    category: allShopifyCollection(filter: { id: { eq: $id }}) {
      edges {
        node {
          title
          handle
          description
          products {
            id
            title
            description
            images {
              originalSrc
            }
            handle
          }
        }
      }
    }

  }
`;

const HeaderContainer = styled.div`
  max-width: 80rem;
  text-align: center;
  margin: 50px auto 5rem;
`;

const CategoryTitle = styled.div`
  font-size: 3rem;
  margin-bottom: 30px;

  &::after {
    content: "";
    display: block;
    height: 1px;
    width: 120px;
    background-color: black;
    margin: 22px auto 10px;
  }
`;

const CategoryDescription = styled.p`
  font-family: var(--font-serif);
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  max-width: 470px;
  text-align: center;
  margin: 0px auto 40px;
`;

export default ProductCategoryPage;
