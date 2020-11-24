import React from "react";
import { Card, Button } from "react-bootstrap";
import CommentArea from "./CommentArea";

//let { book } = props //
// let book = props.book

const SingleBook = props => {
  const { 
    img,  
    title, 
    price } = props.book;

  
  return (
    <Card className={"mx-auto my-4"} style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={img}
        style={{ height: "300px", "object-fit": "cover" }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>$ {price}</Card.Text>
        <Button variant="primary" onClick={props.onClick}>Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;
