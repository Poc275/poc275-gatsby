import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from "../components/layout"
import Menu from "../components/menu"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ProjectGrid from "../components/project-grid"
import About from "../components/about"

export default () => (
    <Layout>
        <Menu />

        <Container>
            <Row>
                <Col>
                    <h1 className="text-center mx-auto">
                        <span role="img" aria-label="another day">🌔 </span>
                        Another day, another debug
                        <span role="img" aria-label="another debug"> 🐛</span>
                    </h1>
                </Col>
            </Row>
        </Container>

        <ProjectGrid />

        <About />
    </Layout>
)
