import React from "react"
import BackgroundImage from 'gatsby-background-image'
import styles from './project-header.module.scss'

export default (props) => {
    const backgroundImageStack = [
        'linear-gradient(to bottom, rgba(12, 16, 28, 0) 0%, rgba(12, 16, 28, 0.65) 65%, rgba(12, 16, 28, 0.65) 66%)',
        props.metadata.featuredImage.childImageSharp.fluid
    ]

    const demoLink = props.metadata.demo ? 
        <p><span role="img" aria-label="demo">🔗 </span><a href={props.metadata.demo}>View</a></p>
    : null;

    const subtitle = props.metadata.subtitle ? <h2>{props.metadata.subtitle}</h2> : null

    return (
        <div>
            <BackgroundImage
                fluid={backgroundImageStack}
                id={'project-header'}
                className={styles.projectHeader}
                style={{
                    backgroundAttachment: 'fixed',
                }}
            >
                <div className={styles.projectMeta}>
                    <h1>{props.metadata.title}</h1>
                    {subtitle}
                    <p><span role="img" aria-label="date made" title="Date Made">📅 </span>{props.metadata.period}</p>
                    <p><span role="img" aria-label="built with" title="Built With">🔨 </span>{props.metadata.languages}</p>
                    <p><span role="img" aria-label="tools used" title="Tools Used">🔧 </span>{props.metadata.tools}</p>
                    {demoLink}
                </div>
            </BackgroundImage>
        </div>
    )
}
