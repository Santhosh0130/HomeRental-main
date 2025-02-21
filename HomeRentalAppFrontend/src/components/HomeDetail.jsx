import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Container, Row, Image, Button, Carousel, Modal } from 'react-bootstrap'
import axios from 'axios'
import HomeContext from '../context/Context'

const HomeDetail = () => {

    const { API } = useContext(HomeContext);

    const [show, setShow] = useState(false);

    const { id } = useParams();
    const [det, setDet] = useState([]);
    const thumbnails = Array.isArray(det.thumbnails) ? det.thumbnails : [];
    useEffect(() => {
        const fetchDetail = async () => {
            await axios.get(API + `products/product/${id}`).then((response) => {
                setDet(response.data)
                console.log(response.data)
            }).catch((err) => {
                console.error("Error fetching product:", err);
            })
        };
        fetchDetail();
    }, [id])
    // console.log(addr[0]) 

    return (
        <>
            <Modal onHide={() => setShow(false)} show={show} centered size='sm' >
                <Modal.Header closeButton>
                    <h4 className='m-0'>Owner {det.ownerDetails?.name}</h4>
                </Modal.Header>
                <Modal.Body>
                    <ul className='list-unstyled'>
                        <li>Phone No: {det.ownerDetails?.phone}</li>
                        <li>Email: {det.ownerDetails?.email}</li>
                        <li>Age: {det.ownerDetails?.age}</li>
                        <li>Address: {det.ownerDetails?.address}</li>
                    </ul>
                </Modal.Body>
            </Modal>
            <Container fluid>
                <Row className='h-100 py-5 d-flex align-items-center justify-content-center' fluid>
                    <Col sm={12} md={6} lg={5}>
                        <Carousel slide={false} interval={30000}>
                            {thumbnails.map((_, index) => (
                                <Carousel.Item key={index}>
                                    <Image src={API + `products/${det.houseId}/thumbnails/${index}`} fluid style={{ width: "100%", height: "500px", objectFit: "cover" }}></Image>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                    <Col sm={12} md={6} lg={5} className='d-flex flex-column align-items-start justify-content-around gap-2'>
                        {/* <div className='w-100 d-flex align-items-center justify-content-between'> */}
                        <div className="display-5">{det.addressDetails?.city} city</div>
                        <div className="d-flex gap-2 align-items-center">
                            <div className="fs-4 fw-bold display-5 my-2"> ₹ {det.houseDetails?.rent}</div>
                            <div style={{fontSize: ".9em"}}>(Rent per Month)</div>
                        </div>
                        {/* </div> */}
                        {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima at rem excepturi officiis cum dolorum?</p> */}
                        <div style={{ fontSize: ".9em" }}>{det.houseDetails?.description}</div>
                        <div className='mt-3'>
                            <h5>House Details</h5>
                            <div className="text-capitalize">BHK: {det.houseDetails?.bhk}</div>
                            <div className="text-capitalize">House Type: {det.houseDetails?.type === 'independent' ? "independent house" : det.houseDetails?.type}</div>
                            <div className="text-capitalize">Furniture: {det.houseDetails?.furnished} Furnished</div>
                            <div className="text-capitalize">Parking: {det.houseDetails?.parking}</div>
                            {/* <div className="">Address: {addr[0].house_no}, {addr[0].street}, {addr[0].city}, {addr[0].district}, {addr[0].state}, {addr[0].country} - {addr[0].zip}</div> */}
                        </div>
                        <Button className='bg-color2 my-3' onClick={() => setShow(true)}>Contact Owner</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HomeDetail