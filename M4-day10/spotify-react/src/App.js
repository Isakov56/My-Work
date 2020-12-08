import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";
import './App.css';
import Home from "./components/Home"
import SideBar from "./components/SideBar"
import Album from "./components/Album"

class App extends React.Component {
  state={
    searchQuery: null

  }

  handleCallback = (childData) =>{
    this.setState({searchQuery: childData})
}

  render(){
      return(
          <div className="App d-flex">
            <Router>
              <SideBar />
              <Route path="/" exact render={(props) => (<Home {...props} parentCallback = {this.handleCallback}/>)} />
              <Route path="/album" exact render={(props) => (<Album {...props} data={this.state.searchQuery}/>)} />
            </Router>
            {console.log("this is my data", this.state.searchQuery)}
          </div>
      )
  }
}
export default App
