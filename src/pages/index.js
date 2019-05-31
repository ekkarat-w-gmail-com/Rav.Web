// @flow
import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components';
import { map, getOr } from 'lodash/fp';

// Components
import Layout from '../components/layout'
import SEO from '../components/seo'
import { BlockContainer } from '../components/Blocks';

// Utils
import * as routes from '../utils/routes';

// Types
type Props = {
  data: Object
}

const IndexPage = ({ data }: Props) => {

  const { landingPage } = data;

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <BlockContainer blocks={landingPage.blocks} />
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


export const query = graphql`
{
  landingPage: contentfulLandingPage (slug: { eq: "start-page" }) {
    blocks {
      id
      type
      title
      label

      content {
        json
      }

      media {
        file {
          url
          contentType
        }
      }

      references {
        __typename

        ... on ContentfulProduct {
          id
          name
          slug
          shortDescription {
            shortDescription
          }
          featuredImage {
            fixed(width: 704, height: 704, quality: 100, resizingBehavior: THUMB) {
              src
            }
          }
          internal {
            type
          }
        }

        ... on ContentfulProductCategory {
          id
          name
          slug
          internal {
            type
          }
        }

        ... on ContentfulPage {
          id
          title
          label
          excerpt {
            excerpt
          }
          featuredMedia {
            fixed(width: 1024, height: 682, quality: 100, resizingBehavior: THUMB) {
              src
            }
          }
          slug
          internal {
            type
          }
        }
      }

    }
  }
}
`;

export default IndexPage
