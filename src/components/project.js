import React from 'react'
import Col from "react-bootstrap/Col"
import styles from './project.module.scss'

export default (props) => (
    <Col md={3} className={styles.projectItem}>
        <div className={styles.projectItemOuter}>
            <a href="/">
                <div className={styles.projectItemInner} id={props.class}>
                    <div className={styles.overlay}>
                        <p className={styles.overlayTitle}>{props.title}</p>
                    </div>
                </div>
            </a>
        </div>
    </Col>
)