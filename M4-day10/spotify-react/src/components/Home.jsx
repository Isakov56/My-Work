import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import './Home.css';
import HomeNavBar from "./HomeNavBar"
import { Link, withRouter } from 'react-router-dom'
class Home extends React.Component {
    //  changeHandler = (event) => {
    //     query = event.target.value.toLowerCase()
    // }
    state={
        mySongs: [],
        query: 'eminem'
    }
     search = () =>{
        fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q=' + this.state.query, {
        'method': 'GET',
        headers:{
            "x-rapidapi-key": "27306e4301msh978be9559c7efaap13b3d3jsn3fdc810abb52",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
      })
     .then((res) => {
         return res.json()
     })
     .then((songs) => {
         console.log("this my somgs array", songs)
         this.props.parentCallback(songs.data);
        this.setState({
            mySongs: songs.data
      })
       })
       .catch((err) => {
           console.error(err)
       })
    }

    componentDidMount() {
    this.search()
    };
    

    render(){
        return(
            <>
            <div className="home" style={{width: "80%"}}>
                <HomeNavBar />
                <Container>
                <Link to="/album">
                    <h1 style={{textTransform: "capitalize", color: "white"}}>{this.state.query}</h1>
                </Link>
                <Row>
                {this.state.mySongs.map((song) => (
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
export default withRouter(Home)