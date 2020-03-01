import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from "../components/layout"
import Menu from "../components/menu"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ProjectGrid from "../components/project-grid"

export default () => (
    <Layout>
        <Menu />

        <Container>
            <Row>
                <Col>
                    <h1 className="text-center mx-auto">
                        <span role="img" aria-label="another day">🌔 </span>
                        Another day, another debug
                        <span role="img" aria-label="another debug"> 🐛</span>
                    </h1>
                </Col>
            </Row>
        </Container>

        <ProjectGrid />

        <p>Maroon galleon Corsair hornswaggle cable Admiral of the Black crow's nest cackle fruit Chain Shot come about. Tackle red ensign bilge water mizzenmast holystone prow scallywag landlubber or just lubber interloper bilge. Letter of Marque hogshead Buccaneer careen Sink me main sheet bilge rat smartly Gold Road run a shot across the bow.</p>

        <p>Barbary Coast Blimey scourge of the seven seas boatswain red ensign aye smartly grog scuppers long boat. Six pounders careen parrel Privateer Arr tackle case shot reef gaff bring a spring upon her cable. Tender Privateer gangway shrouds trysail flogging matey capstan quarter bilge water.</p>

        <p>Lugger careen knave marooned lateen sail Arr capstan grog blossom shrouds maroon. Bilge rat Sea Legs long clothes barque walk the plank Jolly Roger spyglass Gold Road execution dock ye. Salmagundi matey doubloon overhaul grog blossom Brethren of the Coast walk the plank brigantine loot run a shot across the bow.</p>
    </Layout>
)
