/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const map = require('lodash/fp/map');
const get = require('lodash/fp/get');
const has = require('lodash/fp/has');
const size = require('lodash/fp/size');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const query = `
  {
    allShopifyProduct {
      edges {
        node {
          id
          handle
          options {
            name
            values
          }
        }
      }
    }

    allShopifyCollection {
      edges {
        node {
          title
          id
          handle
        }
      }
    }

  }
  `;

  try {

    const pages = await graphql(query);

    if ( has('errors', pages) ) {
      throw pages.errors;
    }

    console.log('\x1b[33m%s\x1b[0m', '\n ==== Starting building pages ==== \n');

    // Create products based on shopify
    map(({ node }) => {

      const slug = `/product/${node.handle}`;

      // Use a different template if the product has variations
      if ( has('options', node) && size(get('options', node)) > 1 ) {
        console.log('\u001b[34m', 'Creating single product page with variants (Shopify) -->', slug);
        createPage({
          path: slug,
          component: path.resolve('./src/templates/shopify-variation-product.js'),
          context: {
            id: node.id,
          }
        })
      } else {
        console.log('\u001b[34m', 'Creating single product page (Shopify) -->', slug);
        createPage({
          path: slug,
          component: path.resolve('./src/templates/shopify-single-product.js'),
          context: {
            id: node.id,
          }
        })
      }

    }, pages.data.allShopifyProduct.edges);

    map(({ node }) => {
      const slug = `/category/${node.handle}`;
      console.log('\u001b[34m', 'Creating product category page (Shopify) -->', slug);
      createPage({
        path: slug,
        component: path.resolve('./src/templates/taxonomy-productCategory.js'),
        context: {
          id: node.id,
          slug: node.handle
        }
      })

    }, pages.data.allShopifyCollection.edges)

    console.log('\x1b[33m%s\x1b[0m', '\n ==== Finished building pages ==== \n')

  } catch(error) {
    console.log('\x1b[33m%s\x1b[0m', '\n ==== Error: Could not build pages - See log ==== \n')
    console.log(error);
    console.log('\x1b[33m%s\x1b[0m', '\n ==== Error: End log ==== \n')
  }

}
