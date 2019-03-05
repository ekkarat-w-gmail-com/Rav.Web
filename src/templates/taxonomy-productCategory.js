import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components';

// components
import Layout from "../components/layout"
import { ProductList } from '../components/ProductList';

const ProductCategoryPage = ({ data }) => {
  const { category, products } = data;

  return (
    <Layout>
      <HeaderContainer>
        <CategoryTitle>{category.name}</CategoryTitle>
        <CategoryDescription>Short text about women’s pants lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</CategoryDescription>
      </HeaderContainer>
      <ProductList
        columns={3}
        products={products && products.edges}
        excerptSource={'shortDescription.shortDescription'}
        thumbnailSource={'featuredImage.fixed.src'}
      />
    </Layout>
  )
}

export const query = graphql`
  query productCategoryQuery($slug: String!) {
    category: contentfulProductCategory(slug: { eq: $slug }) {
      name
      id
      slug
    }
    products: allContentfulProduct(filter: { categories: { slug: { in: [$slug] } } }) {
      edges {
        node {
          name
          id
          slug
          shortDescription {
            shortDescription
          }
          featuredImage {
            id
            fixed(width: 1000, height: 1500, quality: 100) {
              src
            }
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
