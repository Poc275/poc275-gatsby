import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styles from './menu.module.scss'

export default () => (
    <Navbar expand="md">
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content" className="justify-content-center">
            <Nav>
                <Nav.Link href="/#about-me" className={styles.menuLink}>
                    <span role="img" aria-label="who is this">👀 </span>who is this?
                </Nav.Link>
                <Nav.Link href="/#my-work" className={styles.menuLink}>
                    <span role="img" aria-label="my work">👨‍💻 </span>my work
                </Nav.Link>
                <Navbar.Text className={styles.menuName}>
                    <Nav.Link href="/">Peter O'Connor</Nav.Link>
                </Navbar.Text>
                <Nav.Link href="https://swiftcv.com/@poc275" className={styles.menuLink}>
                    <span role="img" aria-label="my CV">📝 </span>my CV
                </Nav.Link>
                <Nav.Link href="/#contact" className={styles.menuLink}>
                    <span role="img" aria-label="who is this">📣 </span>contact
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)