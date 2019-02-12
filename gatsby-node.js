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

    console.log('\n ==== Starting building pages ==== \n')

    map(({ node }) => {
      const slug = `/product/${node.slug}`;
      console.log('Creating single product page -->', slug);
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/single-product.js`),
        context: {
          slug: node.slug, // // Data passed to context is available in page queries as GraphQL variables.
        }
      })
    }, result.data.allContentfulProduct.edges);

    map(({ node }) => {
      const slug = `/category/${node.slug}`;
      console.log('Creating taxonomy productCategory page -->', slug);
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/taxonomy-productCategory.js`),
        context: {
          slug: node.slug, // // Data passed to context is available in page queries as GraphQL variables.
        }
      })
    }, result.data.allContentfulProductCategory.edges);

    console.log('\n ==== Finished building pages ==== \n')

  });

}
