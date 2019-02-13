/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const map = require('lodash/fp/map');

exports.createPages = ({ graphql, actions }) => {

  const { createPage } = actions;

  const query = `
    {

      allContentfulProduct {
        edges {
          node {
            slug
          }
        }
      }

      allContentfulProductCategory {
        edges {
          node {
            slug
          }
        }
      }


    }
  `;

  return graphql(query).then((result) => {

    console.log('\x1b[33m%s\x1b[0m', '\n ==== Starting building pages ==== \n')

    map(({ node }) => {
      const slug = `/product/${node.slug}`;
      console.log('Creating single product page -->', slug);
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/single-product.js`),
        context: { // Data passed to context is available in page queries as GraphQL variables.
          slug: node.slug,
          id: node.id
        }
      })
    }, result.data.allContentfulProduct.edges);

    map(({ node }) => {
      const slug = `/category/${node.slug}`;
      console.log('Creating taxonomy productCategory page -->', slug);
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/taxonomy-productCategory.js`),
        context: { // Data passed to context is available in page queries as GraphQL variables.
          slug: node.slug,
          id: node.id
        }
      })
    }, result.data.allContentfulProductCategory.edges);

    console.log('\x1b[33m%s\x1b[0m', '\n ==== Finished building pages ==== \n')

  });

}
