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

      allContentfulBrands {
        edges {
          node {
            slug
            id
            node_locale
          }
        }
      }

    }
  `;

  return graphql(query).then((result) => {

    console.log('\x1b[33m%s\x1b[0m', '\n ==== Starting building pages ==== \n')

    map(({ node }) => {
      const slug = `/produkt/${node.slug}`;
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
    }, result.data.allContentfulProduct.edges);

    map(({ node }) => {
      const slug = `/kategori/${node.slug}`;
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
    }, result.data.allContentfulProductCategory.edges);

    map(({ node }) => {
      const slug = `/varumärke/${node.slug}`;
      console.log('Creating brand page -->', slug);
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/brand.js`),
        context: { // Data passed to context is available in page queries as GraphQL variables.
          slug: node.slug,
          id: node.id,
          locale: node.node_locale
        }
      })
    }, result.data.allContentfulBrand.edges);

    console.log('\x1b[33m%s\x1b[0m', '\n ==== Finished building pages ==== \n');
  });

}
