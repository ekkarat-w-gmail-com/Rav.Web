const { BLOCKS, MARKS, INLINES } = require('@contentful/rich-text-types')

let activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development'

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: `Räv`,
    description: `Learning project for e-commerce and gatsby`,
    author: `@patrickedqvist`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-portal`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`, // Add support of styled-components
    `gatsby-plugin-flow`, // Add support of flow
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`, // Add support for contentful
      options: {
        spaceId: `${process.env.CONTENTFUL_SPACE_ID}`,
        accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      }
    },
    {
      resolve: `@contentful/gatsby-transformer-contentful-richtext`,
      options: {
        renderOptions: {
          renderMark: {
            [MARKS.BOLD]: text => `<strong>${text}<strong>`,
            [MARKS.ITALIC]: text => `<em>${text}<em>`,
          },
        }
      }
    }
  ],
}
