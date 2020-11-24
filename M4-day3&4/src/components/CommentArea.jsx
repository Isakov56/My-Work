import React from "react";
// import { Card, Button } from "react-bootstrap";
import CommentsList from "./CommentsList";

const CommentArea = (props) => {
  console.log(props.myBook)
  return (
      <div>
          <CommentsList myBook={this.props.myBook}/>
      </div>
  );
};

export default CommentArea;