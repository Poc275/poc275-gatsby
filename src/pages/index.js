import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from "../components/layout"
import Menu from "../components/menu"
import Welcome from "../components/welcome"
import ProjectGrid from "../components/project-grid"
import About from "../components/about"

export default () => (
    <Layout>
        <Menu />
        <Welcome />
        <ProjectGrid />
        <About />
    </Layout>
)
