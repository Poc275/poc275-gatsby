import React from 'react'
import Col from "react-bootstrap/Col"
import styles from './project.module.scss'
import { Link } from 'gatsby'

export default (props) => {
    // check if this is a static page or a markdown "dynamic" page 
    // to choose the correct linking mechansim (<a> or <Link>)
    const project = props.static ? 
        // static page, use <a>
        <a href={props.link}>
            <div className={styles.projectItemInner} id={props.class}>
                <div className={styles.overlay}>
                    <p className={styles.overlayTitle}>{props.title}</p>
                </div>
            </div>
        </a>
        :
        // markdown "dynamic" page, using <Link>
        <Link to={props.link}>
            <div className={styles.projectItemInner} id={props.class}>
                <div className={styles.overlay}>
                    <p className={styles.overlayTitle}>{props.title}</p>
                </div>
            </div>
        </Link>

    return (
        <Col md={3} className={styles.projectItem}>
            <div className={styles.projectItemOuter}>
                {project}
            </div>
        </Col>
    )
}