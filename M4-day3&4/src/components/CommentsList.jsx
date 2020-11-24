import React from "react";
import { Card, Button, Container, Modal } from "react-bootstrap";


const CommentArea = (props) => {
    console.log(props.myBook)
  return (
      <Container>
          <Modal.Dialog>
                <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
      </Container>
  );
};

export default CommentArea;