import React, { useContext, useState } from "react";
import { Form, Button, Card, Container, FloatingLabel, Row, Col, Image } from "react-bootstrap";
import AddUserImage from '../assets/add_user_background.svg'
import axios from "axios";
import HomeContext from "../context/Context";

// axios.defaults.withCredentials = true;
const OwnerDetailsForm = () => {
    const {API, userDetails} = useContext(HomeContext)

    const [ownerDetails, setOwnerDetails] = useState({
        name: "",
        age: "",
        address: "",
        phone: "",
        email: "",
        userId: userDetails[2],
    });

    // Handle form changes
    const handleChange = (e) => {
        setOwnerDetails({ ...ownerDetails, [e.target.name]: e.target.value });
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await axios.post(API + "owner/addOwner", ownerDetails, {
            headers: {
                "Content-Type" : "application/json",
            },
        }).then(() => {
            console.log("Owner's Details are Added.")
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <Container fluid className="mt-4">
            <Row className='vh-90 d-flex align-items-center justify-content-center'>
                <Col sm={6} ls={4} className='d-none d-md-block' >
                    <Image  src={AddUserImage}/>
                </Col>
                <Col md={5} className='d-flex align-items-center justify-content-center'>
                    <Card className="w-100 mx-auto shadow p-3">
                        <Card.Body>
                            <h3 className="text-center">Owner's Registartion</h3>
                            <Form onSubmit={handleSubmit}>
                                {/* Owner Name */}
                                <FloatingLabel controlId="floatingName" label="Owner Name" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter owner name"
                                        name="name"
                                        value={ownerDetails.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>

                                {/* Age */}
                                <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter age"
                                        name="age"
                                        value={ownerDetails.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>

                                {/* Address */}
                                <FloatingLabel controlId="floatingAddress" label="Primary Address" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter address"
                                        name="address"
                                        value={ownerDetails.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>

                                {/* Phone Number */}
                                <FloatingLabel controlId="floatingPhone" label="Phone Number" className="mb-3">
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter phone number"
                                        name="phone"
                                        value={ownerDetails.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>

                                {/* Email */}
                                <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={ownerDetails.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>

                                {/* Submit Button */}
                                <div className="text-center mt-3">
                                    <Button variant="color1" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OwnerDetailsForm;
