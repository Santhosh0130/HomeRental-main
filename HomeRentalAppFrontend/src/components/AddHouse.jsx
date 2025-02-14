import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col, Image, FloatingLabel } from "react-bootstrap";
import HomeContext from "../context/Context";
import Image1 from '../assets/login_background.svg'
import axios from "axios";

const AddHouse = () => {
    const { API, ownerDetails } = useContext(HomeContext)
    // State for tracking the form step
    const [step, setStep] = useState(1);

    const [selectedOwner, setSelectedOwner] = useState([])

    // State for storing form data
    // const [userDetails, setUserDetails] = useState({
    //     name: "",
    //     email: "",
    // });
    const [addressDetails, setAddressDetails] = useState({
        house_no: "12",
        street: "East Street",
        city: "Kalavasal",
        district: "Madurai",
        state: "Tamilnadu",
        country: "India",
        zip: "625005",
    });
    const [houseDetails, setHouseDetails] = useState({
        rent: '12000',
        bhk: '2',
        parking: 'Yes',
        type: '2',
        furnished: '1',
    })
    const [thumbnails, setThumbnails] = useState([]);

    // Handle changes for user details
    const handleImageChange = (e) => {
        setThumbnails(e.target.files)
    };

    // Handle changes for address details
    const handleAddressDetailsChange = (e) => {
        const { name, value } = e.target;
        setAddressDetails({ ...addressDetails, [name]: value });
    };

    const handleHouseDetailsChange = (e) => {
        setHouseDetails({ ...houseDetails, [e.target.name]: e.target.value });
    };

    // Go to next step
    const handleNextStep = () => {
        setStep(step + 1);
    };

    // Go to previous step
    const handlePrevStep = () => {
        setStep(step - 1);
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(ownerDetails,' ',addressDetails, ' ', thumbnails)
        
        const formData = new FormData();
        formData.append("Owner", 
            new Blob([JSON.stringify(ownerDetails)], { type: "application/json"})
        );
        formData.append("Address", 
            new Blob([JSON.stringify(addressDetails)], { type: "application/json"})
        );

        Array.from(thumbnails).forEach((file) => {
            formData.append("thumbnails", file);
        });

        await axios.post(API + "products/addHouse", formData ,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(() => {
            console.log("House Added")
        }).catch((err) => {
            console.log(err)
        })
        // You can also log the form data here or send it to a server
    };

    return (
        <Container fluid className="my-5">
            <Row className='vh-90 d-flex align-items-center justify-content-center'>
                <Col sm={6} ls={4} className='d-none d-md-block' >
                    <Image src={Image1} />
                </Col>
                <Col md={5} sm={12} className='d-flex align-items-center justify-content-center'>
                    <Card className="w-100 mx-auto mt-5 shadow">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                {/* Step 1: User Details */}
                                {step === 1 && (
                                    <>
                                        <h4>Owner's Details</h4>
                                        <div>
                                            <Card className="p-3" style={{ boxShadow: "inset 0px 0px 10px rgba(0,0,0,0.5)" }}>
                                                <h5>Please select one, </h5>
                                                {ownerDetails !== null ?
                                                    <Form.Select size="lg" required>
                                                        {ownerDetails.map((item, index) => (
                                                            <option key={index}>{item.name}</option>
                                                        ))}
                                                    </Form.Select> :
                                                    <>
                                                        <h3>You don't have any owner details yet!.</h3>
                                                        <a href="/ownerRegister">Owner Registration.</a>
                                                    </>
                                                }
                                            </Card>
                                        </div>
                                        <div className="p-4 d-flex align-items-center justify-content-end">
                                            <Button variant="color1" onClick={handleNextStep}>
                                                Next
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {/* Step 2: Address Details */}
                                {step === 2 && (
                                    <>
                                        <h4>Address Details</h4>
                                        <div className="d-flex gap-3 my-3">
                                            <FloatingLabel controlId="floatingHouseNo" label="House No" className="w-25">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your house number"
                                                    name="house_no"
                                                    value={addressDetails.house_no}
                                                    onChange={handleAddressDetailsChange}
                                                />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingStreet" label="Street" className="w-75">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your street"
                                                    name="street"
                                                    value={addressDetails.street}
                                                    onChange={handleAddressDetailsChange}
                                                />
                                            </FloatingLabel>
                                        </div>

                                        <FloatingLabel controlId="floatingCity" label="City" className="my-2">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your city"
                                                name="city"
                                                value={addressDetails.city}
                                                onChange={handleAddressDetailsChange}
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel controlId="floatingDistrict" label="District" className="my-2">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your district"
                                                name="district"
                                                value={addressDetails.district}
                                                onChange={handleAddressDetailsChange}
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel controlId="floatingState" label="State" className="my-2">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your state"
                                                name="state"
                                                value={addressDetails.state}
                                                onChange={handleAddressDetailsChange}
                                            />
                                        </FloatingLabel>

                                        <div className="d-flex gap-3 my-2">
                                            <FloatingLabel controlId="floatingCountry" label="Country">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your country"
                                                    name="country"
                                                    value={addressDetails.country}
                                                    onChange={handleAddressDetailsChange}
                                                />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingZip" label="Zip Code">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your zip code"
                                                    name="zip"
                                                    value={addressDetails.zip}
                                                    onChange={handleAddressDetailsChange}
                                                />
                                            </FloatingLabel>
                                        </div>
                                        <div className="p-4 d-flex align-items-center justify-content-end">
                                            <Button variant="secondary" onClick={handlePrevStep} className="me-2 border">
                                                Back
                                            </Button>
                                            <Button variant="color1" onClick={handleNextStep}>
                                                Next
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {/* Step 3: House Details */}
                                {step === 3 && (
                                    <>
                                        <h4>House Details</h4>
                                        <FloatingLabel controlId="floatingRent" label="Rent" className="my-2">
                                            <Form.Control
                                                type="number"
                                                name="rent"
                                                value={houseDetails.rent}
                                                onChange={handleHouseDetailsChange}
                                                placeholder="Enter rent amount"
                                                required
                                            />
                                        </FloatingLabel>

                                        <div className="d-flex gap-3 my-2">
                                            <FloatingLabel controlId="floatingBhk" label="BHK" className="w-50">
                                                <Form.Select
                                                    name="bhk"
                                                    value={houseDetails.bhk}
                                                    onChange={handleHouseDetailsChange}
                                                    required
                                                >
                                                    <option value="">Select BHK</option>
                                                    <option value="1">1 BHK</option>
                                                    <option value="2">2 BHK</option>
                                                    <option value="3">3 BHK</option>
                                                    <option value="4">4+ BHK</option>
                                                </Form.Select>
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingParking" label="Parking" className="w-50">
                                                <Form.Select
                                                    name="parking"
                                                    value={houseDetails.parking}
                                                    onChange={handleHouseDetailsChange}
                                                    required
                                                >
                                                    <option value="">Select Parking</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </div>

                                        <FloatingLabel controlId="floatingType" label="Type" className="my-2">
                                            <Form.Select
                                                name="type"
                                                value={houseDetails.type}
                                                onChange={handleHouseDetailsChange}
                                                required
                                            >
                                                <option value="">Select Type</option>
                                                <option value="Apartment">Apartment</option>
                                                <option value="Villa">Villa</option>
                                                <option value="Independent House">Independent House</option>
                                            </Form.Select>
                                        </FloatingLabel>

                                        <FloatingLabel controlId="floatingFurnished" label="Furnished" className="my-2">
                                            <Form.Select
                                                name="furnished"
                                                value={houseDetails.furnished}
                                                onChange={handleHouseDetailsChange}
                                                required
                                            >
                                                <option value="">Select Furnished Status</option>
                                                <option value="Fully Furnished">Fully Furnished</option>
                                                <option value="Semi Furnished">Semi Furnished</option>
                                                <option value="Unfurnished">Unfurnished</option>
                                            </Form.Select>
                                        </FloatingLabel>

                                        <FloatingLabel controlId="floatingImage" label="Upload Image">
                                            <Form.Control
                                                type="file"
                                                name="thumbnails"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageChange}
                                            />
                                        </FloatingLabel>
                                        <div className="p-4 d-flex align-items-center justify-content-end">
                                            <Button variant="secondary" onClick={handlePrevStep} className="me-2 border">
                                                Back
                                            </Button>
                                            <Button variant="color1" type="submit">
                                                Submit
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddHouse
