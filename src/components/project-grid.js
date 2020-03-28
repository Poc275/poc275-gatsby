import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Project from '../components/project'
import { StaticQuery, graphql } from 'gatsby'

export default () => (
    <StaticQuery 
        query={graphql `query {
            allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            class
                            static
                            projectBgImage {
                                childImageSharp {
                                  fluid(maxWidth: 600) {
                                    ...GatsbyImageSharpFluid
                                  }
                                }
                            }
                        }
                    }
                }
            }
        }`}
        render={data => (
            <Container fluid={true} id="my-work">
                <Row>
                    {data.allMdx.edges.map(({node}) => (
                        <Project key={node.id} 
                                 title={node.frontmatter.title} 
                                 class={node.frontmatter.class}
                                 link={node.fields.slug}
                                 static={node.frontmatter.static}
                                 bgImage={node.frontmatter.projectBgImage.childImageSharp.fluid}
                        />
                    ))}
                </Row>
            </Container>
        )}
    />
)
