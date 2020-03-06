import React from 'react'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import styles from './welcome.module.scss'

export default () => (
    <Container>
        <Row id={styles.intro}>
            <Col className="align-self-center">
                <h1 className="text-center mx-auto">
                    <span role="img" aria-label="another day">🌔 </span>
                    Another day, another debug
                    <span role="img" aria-label="another debug"> 🐛</span>
                </h1>
            </Col>
        </Row>
    </Container>
)