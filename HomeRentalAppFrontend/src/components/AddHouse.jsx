import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col, Image, FloatingLabel } from "react-bootstrap";
import HomeContext from "../context/Context";
import Image1 from '../assets/add_user_background.svg'
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddHouse = () => {
    const { API, ownerDetails, refreshData } = useContext(HomeContext)
    // State for tracking the form step
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [userId, setUserId] = useState();
    const [selectedOwner, setSelectedOwner] = useState()
    const [addressDetails, setAddressDetails] = useState();
    const [houseDetails, setHouseDetails] = useState()
    const [thumbnails, setThumbnails] = useState([]);

    const state = useLocation();
    const isUpdate = state.pathname === "/updateHouse" ? true : false
    const house = state.state;

    // console.log(ownerDetails)
    // const [toastMsg, setToastMsg] = useState()

    useEffect(() => {
        if (isUpdate) {
            setSelectedOwner(house.ownerDetails)
            setAddressDetails(house.addressDetails)
            setHouseDetails(house.houseDetails)
            setThumbnails(house.thumbnails)
            // setUserId(house.houseId)
        } else {
            // setUserId(localStorage.getItem("userId"))
            setAddressDetails({
                house_no: "12",
                street: "East Street",
                city: "Kalavasal",
                district: "Madurai",
                state: "Tamilnadu",
                country: "India",
                zip: "625005",
            });
            setHouseDetails({
                rent: 12000,
                bhk: 2,
                parking: 'yes',
                type: 'villa',
                furnished: "semi",
                description: '',
            })
        }
    }, [])


    // Handle changes for user details
    const handleImageChange = (e) => {
        setThumbnails(e.target.files)
    };

    // Handle changes for address details
    const handleAddressDetailsChange = (e) => {
        const { name, value } = e.target;
        setAddressDetails({ ...addressDetails, [name]: value });
    };

    const handleChange = (e) => {
        setSelectedOwner(ownerDetails[e.target.value]);
    }

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
        // console.log(selectedOwner, ' ', addressDetails, ' ', thumbnails, ' ', houseDetails)

        const formData = new FormData();
        formData.append("User", localStorage.getItem("userId"));
        formData.append("Owner",
            new Blob([JSON.stringify(selectedOwner)], { type: "application/json" })
        );
        formData.append("Address",
            new Blob([JSON.stringify(addressDetails)], { type: "application/json" })
        );
        formData.append("House",
            new Blob([JSON.stringify(houseDetails)], { type: "application/json" })
        );

        Array.from(thumbnails).forEach((file) => {
            formData.append("thumbnails", file);
        });

        if (!isUpdate) {
            await axios.post(API + "products/addHouse", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(() => {
                // console.log("House Added")
                //(<ToastBox msg={"House Added Successfully."} color={"green"} />)\
                toast.success("House Added Successfully.", {
                    autoClose: 5000,
                })
                setTimeout(() => {
                    refreshData();
                    navigate(-1)
                }, 5000)
            }).catch(() => {
                // console.log("Error while adding house " + err)
                toast.error("Please fill all the details.")
            })
        } else {
            formData.append("HouseId", house.houseId);
            await axios.put(API + "products/updateHouse", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(() => {
                // console.log("House Updated")
                toast.success("House Added Successfully.", {
                    autoClose: 5000,
                })
                setTimeout(() => {
                    refreshData();
                    navigate(-1)
                }, 3000)
            }).catch((err) => {
                // console.log("Error while updating house " + err)
                toast.error("Please fill all the details.")
            })
        }

    };

    return (
        <Container fluid className="my-5">
            {/* {toastMsg && <ToastBox msg={toastMsg} color={"green"} />} */}
            <Row className='d-flex align-items-center justify-content-center' style={{ height: "72vh" }}>

                <Col md={6} className='d-none d-md-block'>
                    <Image src={Image1} style={{ height: "72vh" }} />
                </Col>

                <Col md={6} sm={12} className='d-flex align-items-center justify-content-center'>
                    <Card className="shadow">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                {/* Step 1: User Details */}
                                {step === 1 && (
                                    <>
                                        <h4 className="my-3">Owner's Detail</h4>
                                        <div>
                                            <Card className="py-4 px-2" style={{ boxShadow: "inset 0px 0px 10px rgba(0,0,0,0.5)" }}>
                                                <strong>Please select one, </strong>
                                                {isUpdate ? <small>Previously choosen owner is <b>{house.ownerDetails.name}</b></small> : null}
                                                {ownerDetails.length > 0 ?
                                                    <div>
                                                        <Form.Select size="lg" required onChange={handleChange}>
                                                            <option>Select your address</option>
                                                            {ownerDetails.map((item, index) => (
                                                                <option key={index} value={index}>{item.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                        <small><a href="/ownerRegister">Add another.</a></small>
                                                    </div> :
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

                                {/* Step 2: House Details */}
                                {step === 2 && (
                                    <>
                                        <h4 className="py-2">Renting House Details</h4>
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
                                                    <option value={1}>1 BHK</option>
                                                    <option value={2}>2 BHK</option>
                                                    <option value={3}>3 BHK</option>
                                                    <option value={4}>4+ BHK</option>
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
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
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
                                                <option value="apartment">Apartment</option>
                                                <option value="villa">Villa</option>
                                                <option value="independent">Independent House</option>
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
                                                <option value="full">Fully Furnished</option>
                                                <option value="semi">Semi Furnished</option>
                                                <option value="un">Unfurnished</option>
                                            </Form.Select>
                                        </FloatingLabel>

                                        <FloatingLabel controlId="floatingImage" label="Upload Image">
                                            <Form.Control
                                                type="file"
                                                name="thumbnails"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageChange}
                                                required
                                            />
                                        </FloatingLabel>

                                        <div className="px-4 py-2 d-flex align-items-center justify-content-end">
                                            <Button variant="secondary" onClick={handlePrevStep} className="me-2 border">
                                                Back
                                            </Button>
                                            <Button variant="color1" onClick={handleNextStep}>
                                                Next
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {/* Step 3: Address Details */}
                                {step === 3 && (
                                    <>
                                        <h4 className="py-2">Renting Address</h4>
                                        <div className="d-flex gap-3">
                                            <FloatingLabel controlId="floatingHouseNo" label="House No" className="w-25">
                                                <Form.Control
                                                    type="text"
                                                    name="house_no"
                                                    value={addressDetails.house_no}
                                                    onChange={handleAddressDetailsChange}
                                                />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingStreet" label="Street" className="w-75">
                                                <Form.Control
                                                    type="text"
                                                    name="street"
                                                    value={addressDetails.street}
                                                    onChange={handleAddressDetailsChange}
                                                />
                                            </FloatingLabel>
                                        </div>

                                        <FloatingLabel controlId="floatingCity" label="City" className="my-2">
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={addressDetails.city}
                                                onChange={handleAddressDetailsChange}
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel controlId="floatingDistrict" label="District" className="my-2">
                                            <Form.Control
                                                type="text"
                                                name="district"
                                                value={addressDetails.district}
                                                onChange={handleAddressDetailsChange}
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel controlId="floatingState" label="State" className="my-2">
                                            <Form.Control
                                                type="text"
                                                name="state"
                                                value={addressDetails.state}
                                                onChange={handleAddressDetailsChange}
                                            />
                                        </FloatingLabel>

                                        <div className="d-flex gap-3 my-2">
                                            <FloatingLabel controlId="floatingCountry" label="Country">
                                                <Form.Control
                                                    type="text"
                                                    name="country"
                                                    value={addressDetails.country}
                                                    onChange={handleAddressDetailsChange}
                                                />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingZip" label="Zip Code">
                                                <Form.Control
                                                    type="text"
                                                    name="zip"
                                                    value={addressDetails.zip}
                                                    onChange={handleAddressDetailsChange}
                                                />
                                            </FloatingLabel>
                                        </div>

                                        <div className="px-4 py-2 d-flex align-items-center justify-content-end">
                                            <Button variant="outline" onClick={handlePrevStep} className="me-2 border">
                                                Back
                                            </Button>
                                            <Button variant="color1" type="submit">
                                                {isUpdate ? "Update" : "Submit"}
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
