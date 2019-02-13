import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components';
import { map, getOr } from 'lodash/fp';

import Layout from '../components/layout'
import SEO from '../components/seo'
import { ProductCategoryCard } from '../components/Cards';

const IndexPage = ({ data }) => {

  const { categories } = data;

  const categoryCards = map(({ node }) => (
    <ProductCategoryCard
      key={node.id}
      title={node.name}
      to={`/category/${node.slug}`}
      backgroundImage={getOr(undefined, 'thumbnail.file.url', node)} />
  ), categories.edges);

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Video>
        <video className="video" loop muted autoPlay playsInline>
          <source src="https://www.fjallraven.se/assets/download/81/press_room_classic_t04-12881.mp4" type="video/mp4" />
        </video>
      </Video>
      <CategoriesList>{categoryCards}</CategoriesList>
    </Layout>
  )
}

const CategoriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-column-gap: 2rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4rem;
`;

const Video = styled.div`
  .video {
    width: 100%;
    height: auto;
  }
`;


export const query = graphql`
{

  categories: allContentfulProductCategory {
    edges {
      node {
        id
        name
        slug
        thumbnail {
          file {
            url
          }
        }
      }
    }
  }

  products: allContentfulProduct {
    edges {
      node {
        id
        name
        slug
        sku
        regularPrice
        salePrice
        stockQuantity
        weight
        width
        height
        dimensionLength
        description {
          childContentfulRichText {
            html
          }
        }
        categories {
          id
        }
        featuredImage {
          id
          file {
            url
            fileName
            contentType
            details {
              size
              image {
                width
                height
              }
            }
          }
        }
        images {
          file {
            url
            fileName
            contentType
            details {
              size
              image {
                width
                height
              }
            }
          }
        }
      }
    }
  }
}
`;

export default IndexPage
