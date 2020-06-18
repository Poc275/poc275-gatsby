import React from "react"
import Layout from "../components/layout"
import Menu from "../components/menu"
import Welcome from "../components/welcome"
import ProjectGrid from "../components/project-grid"
import About from "../components/about"
import Badges from "../components/badges"
import Footer from "../components/footer"
import SEO from '../components/seo'

export default () => (
    <Layout>
        <SEO title="poc275" description="My personal programming portfolio showcasing my programming projects" />
        <Menu />
        <Welcome />
        <ProjectGrid />
        <About />
        <Badges />
        <Footer />
    </Layout>
)
