import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

// This is our template component for a blog post retrieved from markdown files
export default ({ data }) => {
    const post = data.mdx

    return (
        <MDXRenderer>{post.body}</MDXRenderer>
    )
}

// Get the post content from the slug
export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        keywords
      }
    }
  }
`