import React from "react";
import { Spinner, Container } from "react-bootstrap";

const Loading = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="grow" role="status" variant="color1">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default Loading;
