import React from 'react'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faGithub, faStackOverflow, faLinkedinIn, faMediumM } from '@fortawesome/free-brands-svg-icons'
import styles from './footer.module.scss'

export default () => (
    <Container id="contact">
        <Row>
            <Col md={{ span: 8, offset: 2}} className={styles.footerLinks}>
                <a href="mailto:poc275@gmail.com" className="mx-2" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                </a>

                <a href="https://github.com/Poc275" className="mx-2" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>

                <a href="https://stackoverflow.com/story/poc275" className="mx-2" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faStackOverflow} size="2x" />
                </a>

                <a href="https://linkedin.com/in/poc275" className="mx-2" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
                </a>

                <a href="https://medium.com/@poc275" className="mx-2" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faMediumM} size="2x" />
                </a>
            </Col>
        </Row>
        <Row>
            <Col md={{ span: 8, offset: 2}} className="text-center my-3">
                <p>
                    <small>Powered by </small>
                    <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">
                        <img src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" alt="Gatsby Logo" className={styles.gatsbyImage} title="Gatsby" />
                    </a>
                    <small> and </small>
                    <span role="img" aria-label="powered by caffeine" className={styles.emojiSize} title="Tea">☕</span>
                </p>
            </Col>
        </Row>
    </Container>
)