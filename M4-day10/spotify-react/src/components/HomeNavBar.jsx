import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from 'react-router-dom'
import "./HomeNavBar.css"

class HomeNavBar extends React.Component {
    render(){
        return(
            <>
                <Container >
                    <Row style={{textAlign: "center"}}> 
                        <Col>
                            <Link>Trending</Link>
                            <Link>Podcast</Link>
                            <Link>Moods and Genres</Link>
                            <Link>New releases</Link>
                            <Link>Discover</Link>
                        </Col>
                    </Row>
                </Container>
            </>   
        )
    }
}
export default HomeNavBar