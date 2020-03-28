/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Peter O\'Connor\'s Programming Portfolio',
    description: 'My Programming Portfolio',
    author: 'Peter O\'Connor',
    siteUrl: 'https://poc275.me',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          'gatsby-remark-unwrap-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 680
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/markdown`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/markdown/images`
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Peter O\'Connor Personal Portfolio',
        short_name: 'poc275',
        description: 'My personal programming portfolio',
        lang: 'en',
        icon: 'src/images/icon.png',
        start_url: '/',
        display: 'standalone',
        background_color: "#fff",
        theme_color: "#343a40",
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-advanced-sitemap',
      options: {
        query: `
          {
            allMdx {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                    projectBgImage {
                      publicURL
                    }
                  }
                }
              }
            }
          }`,
        additionalSitemaps: [
          {
            url: 'https://poc275.me/sitemap-static-pages.xml',
          }
        ],
      }
    },
  ],
}
