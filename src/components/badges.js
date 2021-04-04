import React from 'react'
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import styles from './badges.module.scss'
import AzureBadge from '../images/microsoft-certified-azure-fundamentals.png'

export default () => (
    <Container fluid={true} id="badges" className={styles.badges}>
        <Row className="justify-content-center">
            <Col className={styles.badgeCol}>
                <h2><span role="img" aria-label="achievements">🏆</span></h2>
                <a href="https://www.youracclaim.com/badges/8c738ab3-2984-4849-86e9-b060ce6dce74/public_url">
                    <img src={AzureBadge} alt="azure fundamentals microsoft certified badge" className={styles.badgeImage} />
                </a>
            </Col>
        </Row>
    </Container>
)