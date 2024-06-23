import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import styles from './menu.module.scss'

export default () => (
    <Navbar expand="lg">
        <Container>
            <Navbar.Brand href="/" className={styles.menuName}>Peter O'Connor</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-content" />
            <Navbar.Collapse id="navbar-content" className="justify-content-center">
                <Nav>
                    <Nav.Link href="/#about-me" className={styles.menuLink}>
                        <span role="img" aria-label="who is this">👀 </span>who is this?
                    </Nav.Link>
                    <Nav.Link href="/#my-work" className={styles.menuLink}>
                        <span role="img" aria-label="my work">👨‍💻 </span>my work
                    </Nav.Link>
                    <Nav.Link href="/#contact" className={styles.menuLink}>
                        <span role="img" aria-label="who is this">📣 </span>contact
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)