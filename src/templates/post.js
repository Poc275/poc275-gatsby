import React from 'react'
import ProjectHeader from '../components/project-header'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import styles from './post.module.scss'
import SEO from '../components/seo'

// This is our template component for a blog post retrieved from markdown files
export default ({ data }) => {
    const post = data.mdx

    return (
        <div>
          <SEO title={post.frontmatter.title} description={post.excerpt} />
          
          <ProjectHeader metadata={post} />

          <div className={styles.postBody}>
            <MDXRenderer>
              {post.body}
            </MDXRenderer>
          </div>
        </div>
    )
}

// Get the post content from the slug
export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      frontmatter {
        title
        subtitle
        demo
        period
        languages
        tools
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      excerpt
    }
  }
`