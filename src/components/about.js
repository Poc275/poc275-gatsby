import React from 'react'
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import styles from './about.module.scss'
import Mugshot from '../images/pete-mugshot.jpg'

export default () => (
    <Container fluid={true} id={styles.aboutMe}>
        <Row>
            <Col md={{ span: 8, offset: 2}} className="text-center">
                <img src={Mugshot} alt="yours truly" id={styles.mugshot} />
            </Col>
        </Row>
        <Row>
            <Col md={{ span: 8, offset: 2}} id={styles.aboutMeCode}>
                <p><span className={styles.comment}>{'//'} About Me...</span></p>
                <p><span className={styles.class}>Developer</span> me = <span className={styles.new}>new</span><span className={styles.class}> Developer</span></p>
                <p>{'{'}</p>
                <p>&emsp;&emsp;&emsp;Name = <span className={styles.string}>"Peter O'Connor"</span>,</p>
                <p>&emsp;&emsp;&emsp;Skills = <span className={styles.new}>new string</span>[] {'{'} <span className={styles.string}>"Front-end"</span>, <span className={styles.string}>"Back-end"</span>, <span className={styles.string}>"Enterprise"</span> {'}'},</p>
                <p>&emsp;&emsp;&emsp;Languages = <span className={styles.new}>new string</span>[] {'{'} <span className={styles.string}>"C#"</span>, <span className={styles.string}>"JavaScript"</span>, <span className={styles.string}>"Python"</span>, <span className={styles.string}>"Java"</span>, <span className={styles.string}>"C++"</span> {'}'},</p>
                <p>&emsp;&emsp;&emsp;Location = <span className={styles.string}>"Derby, UK"</span></p>
                <p>{'};'}</p>
                <p>me.SayHi();</p>
                <br />
                <br />
                <p><span className={styles.class}>Portfolio</span> myPortfolio = <span className={styles.new}>new</span><span className={styles.class}> Portfolio</span></p>
                <p>{'{'}</p>
                <p>&emsp;&emsp;&emsp;Title = <span className={styles.string}>"My Programming Portfolio"</span>,</p>
                <p>&emsp;&emsp;&emsp;Developer = me</p>
                <p>{'};'}</p>
            </Col>
        </Row>
    </Container>
)