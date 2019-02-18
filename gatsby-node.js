/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const map = require('lodash/fp/map');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const query = `
  {
    allContentfulProduct {
      edges {
        node {
          slug
          id
          node_locale
        }
      }
    }
    allContentfulProductCategory {
      edges {
        node {
          slug
          id
          node_locale
        }
      }
    }
    allShopifyProduct {
      edges {
        node {
          id
          handle
        }
      }
    }
  }
  `;

  try {

    const pages = await graphql(query);

    console.log('\x1b[33m%s\x1b[0m', '\n ==== Starting building pages ==== \n')

    // Create products based on contentful
    map(({ node }) => {
      const slug = `/product/${node.slug}`;
      console.log('Creating single product page -->', slug);
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/single-product.js`),
        context: { // Data passed to context is available in page queries as GraphQL variables.
          slug: node.slug,
          id: node.id,
          locale: node.node_locale
        }
      })
    }, pages.data.allContentfulProduct.edges);

    // Create categories based on contentful
    map(({ node }) => {
      const slug = `/category/${node.slug}`;
      console.log('Creating taxonomy productCategory page -->', slug);
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/taxonomy-productCategory.js`),
        context: { // Data passed to context is available in page queries as GraphQL variables.
          slug: node.slug,
          id: node.id,
          locale: node.node_locale
        }
      })
    }, pages.data.allContentfulProductCategory.edges);

    // Create products based on shopify
    map(({ node }) => {
      const slug = `/product/s/${node.handle}`
      console.log('Creating single product page (Shopify) -->', slug);
      createPage({
        path: slug,
        component: path.resolve('./src/templates/shopify-single-product.js'),
        context: {
          id: node.id,
        }
      })
    }, pages.data.allShopifyProduct.edges);

    console.log('\x1b[33m%s\x1b[0m', '\n ==== Finished building pages ==== \n')

  } catch(error) {
    console.log('\x1b[33m%s\x1b[0m', '\n ==== Error: Could not build pages ==== \n')
    console.log(error);
  }

}
