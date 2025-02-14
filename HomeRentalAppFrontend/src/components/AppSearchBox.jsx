import React, { useState } from 'react'
import { Container, Row, Col, InputGroup, Form, Button, ListGroup } from 'react-bootstrap'

const AppSearchBox = () => {
    const [showSearch, setShowSearch] = useState(false)
    return (
        <Container fluid className="d-block d-lg-none">
            <Row className="justify-content-center">
                <Col xxl={8}>
                    <InputGroup className="my-3">
                        <Form.Control
                            placeholder="Search"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onClick={() => setShowSearch(true)}
                        />
                        <Button id="button-addon2">
                            <i className="bi bi-search"></i>
                        </Button>
                    </InputGroup>
                    {showSearch && <ListGroup className='position-absolute w-100' style={{ zIndex: 100 }}>
                        <ListGroup.Item>Hello 1</ListGroup.Item>
                        <ListGroup.Item>Hello 2</ListGroup.Item>
                        <ListGroup.Item>Hello 3</ListGroup.Item>
                    </ListGroup>}
                </Col>
            </Row>
        </Container>
    )
}

export default AppSearchBox