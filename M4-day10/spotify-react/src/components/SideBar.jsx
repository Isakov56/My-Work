import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from 'react-router-dom'

class SideBar extends React.Component {
    render(){
        return(
            <>
                <div className="side-bar" style={{width: "20%", backgroundColor: "black", height: "100vh"}}>
                    <div className="d-flex flex-column ml-3">
                    <div className="d-flex my-2" style={{alignItems: "center"}}>
                        <i className="fab fa-spotify" style={{color: "white", fontSize:" 2.5rem"}}></i>
                        <p style={{textTransform: "capitalize", color: "white", fontSize: "2rem", letterSpacing: "-1px", fontWeight: "600",
                         marginLeft: "2px !important", margin: "0"}}>sptify</p>
                    </div>
                    <Link to="./">
                        <p style={{color: "white", fontSize: "large"}}>Home</p>
                    </Link>
                    <p style={{color: "white", fontSize: "large"}}>Your Library</p>
                    <div className="input-group mb-3 pr-2">
                        <input type="text" className="form-control" 
                        placeholder="Search" 
                        aria-label="Recipient's username" 
                        aria-describedby="button-addon2"
                        onchange="changeHandler(event)"
                        
                        />
                        <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onclick="search()">Go</button>
                        </div>
                    </div>
                </div>
               </div>
            </>   
        )
    }
}
export default SideBar