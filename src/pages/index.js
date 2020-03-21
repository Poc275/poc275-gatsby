import React from "react"
import Layout from "../components/layout"
import Menu from "../components/menu"
import Welcome from "../components/welcome"
import ProjectGrid from "../components/project-grid"
import About from "../components/about"
import Footer from "../components/footer"

export default () => (
    <Layout>
        <Menu />
        <Welcome />
        <ProjectGrid />
        <About />
        <Footer />
    </Layout>
)
