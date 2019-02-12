import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const query = graphql`
{
  allContentfulProduct {
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
