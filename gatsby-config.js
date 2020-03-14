/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'files',
        path: `${__dirname}/src/markdown`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'files',
        path: `${__dirname}/src/markdown/images`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
          }
        ]
      }
    },
    'gatsby-plugin-sharp'
  ],
}
