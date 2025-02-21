import React from "react";
import { Spinner, Container } from "react-bootstrap";

const Loading = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" role="status" variant="color2">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default Loading;
