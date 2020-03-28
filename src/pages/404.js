import React from "react"
import Layout from "../components/layout"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Menu from "../components/menu"
import styles from './404.module.scss'

export default () => (
    <Layout>
        <Menu />
        <Container>
            <Row id={styles.intro}>
                <Col className="align-self-center">
                    <h1 className="text-center mx-auto">
                        <span className={styles.missingEmoji} role="img" aria-label="another day">🌒 </span>
                        Another day, another bug
                        <span className={styles.missingEmoji} role="img" aria-label="another bug"> 🐛</span>
                    </h1>
                    <p className="text-center mx-auto">
                        The page you are looking for cannot be found. Use the menu <span role="img" aria-label="direction to menu">👆</span> to get back on track.
                    </p>
                </Col>
            </Row>
        </Container>
    </Layout>
)
