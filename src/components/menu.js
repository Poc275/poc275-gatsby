import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default () => (
    <Navbar expand="md">
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
            <Nav>
                <Nav.Link href="#about-me">
                    <span role="img" aria-label="who is this">👀 </span>who is this?
                </Nav.Link>
                <Nav.Link href="#my-work">
                    <span role="img" aria-label="my work">👨‍💻 </span>my work
                </Nav.Link>
                <Navbar.Text>
                    Peter O'Connor
                </Navbar.Text>
                <Nav.Link href="https://app.swiftcv.com/@/poc275" target="_blank">
                    <span role="img" aria-label="my CV">📝 </span>my CV
                </Nav.Link>
                <Nav.Link href="#contact">
                    <span role="img" aria-label="who is this">📣 </span>contact
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)