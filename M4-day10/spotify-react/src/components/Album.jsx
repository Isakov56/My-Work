import React, { Component } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import "./Album.css"
class Album extends React.Component {
    render(){
        console.log("this is my data in Album", this.props.data)
        console.log("This are my extended props", this.props)
        // this.props.history.push("/album"+)
        return(
            <>
            <div className="d=flex">
                <img src="https://i2.wp.com/endofacentury.it/wp-content/uploads/2020/03/eminem-album-2020-foto.jpg?fit=2560%2C1440&ssl=1" 
                id="artist-img"
                alt=""/>
                <Container className="main" >
                    <Row>
                        <Col>
                            <h5 className="">Monthly listeners</h5>
                            {/* <h2 >{this.props.data.}</h2> */}
                            <Container>
                                <Row className="d-flex justify-content-center">
                                    <Button className="success mr-1" style={{}}>Play</Button>
                                    <Button>Follow</Button>
                                </Row>
                            </Container>
                        </Col>
                        <Container className="d-flex nav-link justify-content-center">
                        <Row>
                                <Link className="link"><h4>Overview</h4></Link>
                                <Link className="link"><h4>Related Artist</h4></Link>
                                <Link className="link"><h4>About</h4></Link>   
                        </Row>
                     </Container>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        {this.props.data.map((song) => (
                            <Col 
                            xs={6}
                            md={3}
                            lg={2}>
                            <img className="img-fluid" src={song.album.cover} style={{width:"10rem", height:"12rem"}}/>
                            <p style={{color:"white"}}>
                            {song.album.title}
                            </p>
                            </Col>
                        ))}
                    </Row>
                
                </Container>
            </div>
                
            </>   
        )
    }
}
export default Album