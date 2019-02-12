import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  const { contentfulProduct } = data;
  return (
    <Layout>

        <h1>{contentfulProduct.name}</h1>
        <small>Artikelnummer: {contentfulProduct.sku}</small>
      
    </Layout>
  )
}

export const query = graphql`
  query productQuery($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      regularPrice
      salePrice
      sku
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
`
