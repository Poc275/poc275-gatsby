import React, { Component } from 'react'
import Col from "react-bootstrap/Col"
import styles from './project.module.scss'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'

const StyledBackgroundImage = styled(BackgroundImage)`
    height: 100%;
    width: 100%;
    background-size: cover;
    transition: all 0.5s ease;

    &:hover {
        transform: scale(1.05);
    }
`

const StyledOverlay = styled.div`
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;

    ${StyledBackgroundImage}:hover & {
        opacity: 1;
    }
`

class Project extends Component {
    state = {
        hover: false
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    render() {
        const backgroundImageStack = [this.props.bgImage]
        const hoverBackgroundImageStack = [
            'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))',
            this.props.bgImage
        ]

        const bgImageStack = this.state.hover ? hoverBackgroundImageStack : backgroundImageStack

        // check if this is a static page or a markdown "dynamic" page 
        // to choose the correct linking mechansim (<a> or <Link>)
        const project = this.props.static ? 
            // static page, use <a>
            <a href={this.props.link}>
                <StyledBackgroundImage fluid={bgImageStack} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                    <StyledOverlay>
                        <p className={styles.overlayTitle}>{this.props.title}</p>
                    </StyledOverlay>
                </StyledBackgroundImage>
            </a>
            :
            // markdown "dynamic" page, using <Link>
            <Link to={this.props.link}>
                <StyledBackgroundImage fluid={bgImageStack} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                    <StyledOverlay>
                        <p className={styles.overlayTitle}>{this.props.title}</p>
                    </StyledOverlay>
                </StyledBackgroundImage>
            </Link>

        return (
            <Col md={3} className={styles.projectItem}>
                <div className={styles.projectItemOuter}>
                    {project}
                </div>
            </Col>
        )
    }
}

export default Project