import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Container, Row, Image, Button, Carousel } from 'react-bootstrap'
import one from '../assets/Houses/home-1.jpg'
import axios from 'axios'

const HomeDetail = () => {

    const { id } = useParams();
    const [det, setDet] = useState([{
        "name": null,
        "amt": null,
        "sqrt": null,
        "type": null,
        "place": null,
        "furniture": null,
        // "address": [{
        //     "house_no": null,
        //     "street": null,
        //     "city": null,
        //     "district": null,
        //     "state": null,
        //     "country": null,
        //     "zip": null,
        // }]
    }])
    const thumbnails = Array.isArray(det.thumbnails) ? det.thumbnails : [];
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/products/product/${id}`
                );
                setDet(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchDetail();
    }, [id])
    // console.log(addr[0]) 

    return (
        <>
            <Container fluid>
                <Row className='m-auto py-5'>
                    <Col sm={12} md={6}>
                        <Carousel slide={false} interval={30000}>
                            {thumbnails.map((_, index) => (
                                <Carousel.Item key={index}>
                                        <Image src={`http://localhost:8080/products/${det.product_id}/thumbnails/${index}`} fluid   style={{width: "100%", height: "300px", objectFit: "cover"}}></Image>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                    <Col sm={12} md={6} className='d-flex flex-column align-items-start justify-content-around'>
                        <div className='w-100 d-flex align-items-center justify-content-between'>
                            <div className="display-5">{det.name}</div>
                            <div className="text-end fs-3"> ₹ {det.amt}</div>
                        </div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima at rem excepturi officiis cum dolorum?</p>
                        <div>
                            <h4>Others</h4>
                            <div className="">Square Feet: {det.sqrt} sqrt</div>
                            <div className="">House Type: {det.type}</div>
                            <div className="">Furniture: {det.furniture ? "Furnished" : "Unfurnished"}</div>
                            {/* <div className="">Address: {addr[0].house_no}, {addr[0].street}, {addr[0].city}, {addr[0].district}, {addr[0].state}, {addr[0].country} - {addr[0].zip}</div> */}
                        </div>
                        <Button className='bg-color2'>Contact Owner</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HomeDetail