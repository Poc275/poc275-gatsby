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
        /* specifying icons manually due to a Apache/IIS bug where 
          the default folder name 'icons' is aliased to the server's icons - 
          https://github.com/gatsbyjs/gatsby/issues/12233 */
        icons: [
          {
            "src": "favicons/icon-48x48.png",
            "sizes": "48x48",
            "type": "image/png"
          },
          {
            "src": "favicons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "favicons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "favicons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "favicons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "favicons/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
          },
          {
            "src": "favicons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "favicons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
        start_url: '/',
        display: 'standalone',
        background_color: "#fff",
        theme_color: "#343a40",
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-react-helmet-canonical-urls',
      options: {
        siteUrl: 'https://poc275.me',
      },
    },
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
    'gatsby-plugin-robots-txt'
  ],
}
