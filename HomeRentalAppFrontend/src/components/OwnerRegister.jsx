import React, { useContext, useState } from "react";
import { Form, Button, Card, Container, FloatingLabel, Row, Col, Image } from "react-bootstrap";
import AddUserImage from '../assets/add_user_background.svg'
import axios from "axios";
import HomeContext from "../context/Context";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

const OwnerDetailsForm = () => {
    const { API, ownerDetails, ownerDetailsData } = useContext(HomeContext)
    const navigate = useNavigate();

    const [changeHandle ,setChangeHandle] = useState(false);
    const [newOwner, setNewOwner] = useState({
        name: "San",
        age: "30",
        address: "North Street, Madurai",
        phone: "9876543210",
        email: "san@email.com",
        userId: localStorage.getItem("userId"),
    });

    // console.log(ownerDetails)

    const handleEdit = (item) => {
        setNewOwner(item);
        setChangeHandle(true);
    }

    const handleDelete = (item) => {
        handleAxios("delete", `owner/removeOwner/${localStorage.getItem('userId')}`, item, "Deleted.")
    }

    // Handle form changes
    const handleChange = (e) => {
        setNewOwner({ ...newOwner, [e.target.name]: e.target.value });
    };

    async function handleAxios(methodType, path, details, state) {

        await axios({
            method: methodType,
            url: API + path,
            data: details,
            headers: {
                "Content-Type" : "application/json",
            },
        }).then(() => {
            toast.success("Owner's Details are "+state, {
                autoClose: 5000,
            })
            if(state === "Added.") {
                setTimeout(() => {
                    navigate(-1)
                }, 5000)
            } else ownerDetailsData();
        }).catch(() => {
            toast.error("Error while adding the owner's registration.")
        })
    }

    // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(newOwner)
        if(changeHandle) handleAxios("put", `owner/updateOwner/${localStorage.getItem('userId')}`, newOwner, "Updated.");
        else handleAxios("post", `owner/addOwner/${localStorage.getItem('userId')}`, newOwner, "Added.");
    };

    return (
        <Container fluid className="mt-4">
            <Row className='vh-90 d-flex align-items-center justify-content-center'>
                {ownerDetails.length > 0 ? 
                <Col md={4}>
                    <Card className="shadow p-3">
                        <h3 className="">Your Address</h3>
                        {ownerDetails.map((item, index) => (
                            <div className="d-flex align-items-center justify-content-between">
                                <div key={index} role="button" onClick={() => {setNewOwner(item)}}>{index + 1}. {item.name}</div>

                                <div>
                                    <i class="bi bi-pen-fill btn" onClick={() => {handleEdit(item)}}></i>
                                    <i class="bi bi-trash3-fill btn" onClick={() => {handleDelete(item)}}></i>
                                </div>
                            </div>
                        ))}
                    </Card>
                </Col> : 
                <Col sm={6} ls={4} className='d-none d-md-block' >
                    <Image src={AddUserImage} />
                </Col>}

                <Col md={5} className='d-flex align-items-center justify-content-center'>
                    <Card className="w-100 mx-auto shadow p-3">
                        <Card.Body>
                            <h3 className="text-center">Add Owner Address</h3>
                            <Form onSubmit={handleSubmit}>
                                {/* Owner Name */}
                                <FloatingLabel controlId="floatingName" label="Owner Name" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter owner name"
                                        name="name"
                                        value={newOwner.name}
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
                                        value={newOwner.age}
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
                                        value={newOwner.address}
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
                                        value={newOwner.phone}
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
                                        value={newOwner.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>

                                {/* Submit Button */}
                                <div className="text-center mt-3">
                                    <Button variant="color1" type="submit">
                                    {changeHandle ? 
                                        "Update" :
                                        "Submit"}
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
