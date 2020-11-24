import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import "./App.css";

import WarningSign from "./components/WarningSign";
import MyBadge from "./components/MyBadge";
import SingleBook from "./components/SingleBook";
import BookList from "./components/BookList";
function App() {
  return (
    <Container>
      <div className="App">
        <WarningSign text="This is a Strive alert!" />
        <MyBadge text="My badge" color="success" />
        <BookList />
      </div>
    </Container>
  );
}

export default App;
