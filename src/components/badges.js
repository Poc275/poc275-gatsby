import React from 'react'
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import styles from './badges.module.scss'
import Az900Badge from '../images/microsoft-certified-azure-fundamentals.png'
import Az204Badge from '../images/microsoft-certified-azure-developer-associate.1.png'
import Dp900Badge from '../images/microsoft-certified-azure-data-fundamentals.png'

export default () => (
    <Container fluid={true} id="badges" className={styles.badges}>
        <Row className="justify-content-center">
            <Col className={styles.badgeCol}>
                <h2><span role="img" aria-label="achievements">🏆</span></h2>
                <a href="https://www.credly.com/badges/8c738ab3-2984-4849-86e9-b060ce6dce74/public_url">
                    <img src={Az900Badge} alt="azure fundamentals microsoft certified badge" className={styles.badgeImage} />
                </a>
                <a href="https://learn.microsoft.com/api/credentials/share/en-us/PeterOConnor-3626/9C8BB3E6719E218E?sharingId=3EF481FD1B323A0B">
                    <img src={Dp900Badge} alt="azure data fundamentals microsoft certified badge" className={styles.badgeImage} />
                </a>
                <a href="https://learn.microsoft.com/api/credentials/share/en-us/PeterOConnor-3626/235CEA0E69208F28?sharingId=3EF481FD1B323A0B">
                    <img src={Az204Badge} alt="azure developer associate microsoft certified badge" className={styles.badgeImage} />
                </a>
            </Col>
        </Row>
    </Container>
)