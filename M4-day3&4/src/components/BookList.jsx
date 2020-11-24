import { Row, InputGroup, FormControl } from "react-bootstrap";
import React from "react";
import { render } from "@testing-library/react";
import fantasyBooks from "../data/fantasy.json";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";



class BookList extends React.Component {
  state = {
    query: "",
    selectedBook: null
  };

  handleFilterChange = event => {
    //console.log(event.target.value);
    this.setState({ query: event.target.value });
  };

  render() {


    console.log(this.state)
    return (
      <>
        <InputGroup className="mb-3">
          <InputGroup.Prepend></InputGroup.Prepend>
          <FormControl
            aria-describedby="basic-addon1"
            placeholder="Search Books by Title"
            onChange={this.handleFilterChange}
          />
        </InputGroup>

        <Row>
          {fantasyBooks
            .filter(book =>
              book.title.toLowerCase().includes(this.state.query.toLowerCase())
            )
            .map(book => (
              <SingleBook book={book} onClick={() => this.setState({selectedBook:book})} />
            ))}
            <CommentArea myBook={this.state.selectedBook}/>
        </Row>
      </>
    );
  }
}

export default BookList;
