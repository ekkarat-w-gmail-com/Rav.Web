import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const ProductCategoryPage = ({ data }) => {
  const { category } = data;
  return (
    <Layout>
      <h1>{category.name}</h1>
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
  }
`

export default ProductCategoryPage;
