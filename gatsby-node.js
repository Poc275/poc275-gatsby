// This config file hooks into Gatsby's build pipeline

// for friendly urls we need the createFilePath component
// note we use the CommonJS import syntax here because node 
// doesn't play nicely with ES6 imports
const { createFilePath } = require('gatsby-source-filesystem')

// for resolving paths to our template components
const path = require('path')

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
        type BlogPost implements Node {
            title: String,
            date: Date,
            period: String!,
            languages: String!,
            tools: String!,
            demo: String!,
            class: String,
            static: Boolean,
            link: String 
        }
    `
    createTypes(typeDefs)
}

// onCreateNode is called once per node, in Gatsby a node is a data source
// e.g. File, MarkdownRemark, SitePage etc.
exports.onCreateNode = ({node, getNode, actions}) => {    
    // Create friendly URLs for our markdown blog posts
    if(node.internal.type === 'Mdx') {
        // console.log(`*** I am processing a node with type: ${node.internal.type}`)

        // to add the friendly url to the markdown node we use 
        // createNodeField, which we extract from the actions 
        // array of functions via onCreateNode
        // Note this syntax is the same as:
        // const createNodeField = actions.createNodeField
        const { createNodeField } = actions

        // Distinguish between blog posts, which have a slug, and 
        // static pages which have a predefined link set in the frontmatter
        // NOTE! gatsby-develop doesn't serve static html pages so static links 
        // won't work in develop, but do a gatsby build/serve to see how it 
        // looks in production and they will work
        //
        // basePath is the folder where our markdown files live
        const slug = node.frontmatter.static ? node.frontmatter.link : createFilePath({node, getNode, basePath: 'markdown'})
        // const slug = createFilePath({node, getNode, basePath: 'markdown'})
        
        // Assign the field, now we have a 'slug' prop available in our markdown
        // nodes and can retrieve this using GraphQL queries, all node fields are 
        // inside a 'fields' object in GraphQL
        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}

// Create our post pages programmatically
exports.createPages = ({graphql, actions}) => {
    const { createPage } = actions

    // createPages requires a promise
    return new Promise(resolve => {
        graphql(`
            {
                allMdx {
                    edges {
                        node {
                            frontmatter {
                                static
                            }
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
        `).then(result => {
            result.data.allMdx.edges.forEach(({node}) => {
                // createPage from each node if not a "static" page 
                // i.e. one with a link set in the frontmatter
                if(!node.frontmatter.static) {
                    createPage({
                        path: node.fields.slug,
                        component: path.resolve('./src/templates/post.js'),
                        context: {
                            slug: node.fields.slug
                        },
                    })
                }
            })
            resolve()
        })
    })
}