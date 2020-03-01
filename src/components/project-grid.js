import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Project from '../components/project'
import { StaticQuery, graphql } from 'gatsby'

export default () => (
    <StaticQuery 
        query={graphql `query {
            allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
                edges {
                    node {
                        id
                        frontmatter {
                            title
                            image
                            class
                        }
                    }
                }
            }
        }`}
        render={data => (
            <Container fluid={true}>
                <Row>
                    {data.allMarkdownRemark.edges.map(({node}) => (
                        <Project key={node.id} 
                                 title={node.frontmatter.title} 
                                 image={node.frontmatter.image}
                                 class={node.frontmatter.class}
                        />
                    ))}
                </Row>
            </Container>
        )}
    />
)
