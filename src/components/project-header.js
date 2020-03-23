import React from "react"
import BackgroundImage from 'gatsby-background-image'
import styles from './project-header.module.scss'

export default (props) => {
    const backgroundImageStack = [
        'linear-gradient(to bottom, rgba(12, 16, 28, 0.25) 0%, rgba(12, 16, 28, 0.85) 65%, rgba(12, 16, 28, 0.85) 66%)',
        props.metadata.frontmatter.featuredImage.childImageSharp.fluid
    ]

    const demoLink = props.metadata.frontmatter.demo ? 
        <li><span role="img" aria-label="demo">🔗 </span><a href={props.metadata.frontmatter.demo}>Demo</a></li>
    : null;

    const subtitle = props.metadata.frontmatter.subtitle ? <h4>{props.metadata.frontmatter.subtitle}</h4> : null

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
                    <h1>{props.metadata.frontmatter.title}</h1>
                    {subtitle}
                    <ul className={styles.projectMetaList}>
                        <li>
                            <span className={styles.metadataEmoji} role="img" aria-label="date made" title="Date Made">📅 {props.metadata.frontmatter.period}</span>
                            <span className={styles.metadataSeparator}>&nbsp; · &nbsp;</span>
                            <span className={styles.metadataEmoji} role="img" aria-label="date made" title="Date Made">⏲️ {props.metadata.timeToRead} min read</span>
                        </li>
                        <li>
                            <span className={styles.metadataEmoji} role="img" aria-label="built with" title="Built With">🔨 {props.metadata.frontmatter.languages}</span>
                            <span className={styles.metadataSeparator}>&nbsp; · &nbsp;</span>
                            <span className={styles.metadataEmoji} role="img" aria-label="tools used" title="Tools Used">🔧 {props.metadata.frontmatter.tools}</span>
                        </li>
                        {demoLink}
                    </ul>
                </div>
            </BackgroundImage>
        </div>
    )
}
