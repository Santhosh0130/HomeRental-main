import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import HomeContext from '../context/Context';
import axios from 'axios';
import { Check, X } from 'lucide-react';

const Notifications = () => {

    const { response, request, data, API, userDetails, bookingDetailsData, handleAction } = useContext(HomeContext);

    const [items, setItems] = useState([])

    const handleDelete = async (item) => {
        await axios.delete(API + `booking/removeItem?userId=${localStorage.getItem("userId")}&ownerId=${item.userId}&houseId=${item.houseId}`)
            .then(() => {
                console.log("Deleted.")
                bookingDetailsData();
            }).catch((err) => {
                console.log(err)
            })
    }

    // console.log("response, ", response)
    // console.log("request, ", request)

    const handleLoad = (resp) => {
        console.log("On load", resp)
        setItems(resp)
    }

    return (
        <>
            <Tabs
                defaultActiveKey="res"
                id="fill-tab-example"
                className="mb-3 bg-color2"
            // fill
            >
                <Tab eventKey="req" title="Requests">
                    {request.map((req) => (
                        data.filter(house => house.houseId.includes(req.houseId)).map((item, index) => (
                            <Card className='shadow m-2 p-2' key={index}>
                                <div className="d-flex align-items-center">
                                    <Card.Img variant="bottom" src={item.thumbnails[0]} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                    <Card.Body className='d-flex align-items-center justify-content-between'>
                                        {/* <h4>{item.addressDetails.city} city</h4> */}
                                        <div className='fs-4'>{item.addressDetails.area} House</div>
                                        <div>
                                            {/* <i className="bi bi-pen-fill btn"></i> */}
                                            <small>{req.status}</small>
                                        </div>
                                    </Card.Body>
                                </div>
                            </Card>
                        ))
                    ))}
                </Tab>
                <Tab eventKey="res" title="Responces">
                    {response.map((resp) => (
                        data.filter(house => house.houseId.includes(resp.houseId)).map((item, index) => (
                            <Card className='shadow m-2 p-2' key={index} onLoad={() => handleLoad(data.filter(house => house.houseId.includes(resp.houseId)))}>
                                <div className="d-flex align-items-center">
                                    <Card.Img variant="bottom" src={item.thumbnails[0]} style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                                    <Card.Body className='d-flex align-items-center justify-content-between'>
                                        {/* <h4>{item.addressDetails.city} city</h4> */}
                                        <div>
                                            <div className='fs-4'>{item.addressDetails.area} House</div>
                                            {resp.status === "CONFIRMED" ? <div className='d-flex flex-column'>
                                                <br />
                                                <small>Name: {userDetails[1]}</small><small>Phone: {userDetails[0]}</small><small>Gmail: {userDetails[0]}</small>
                                            </div> : <small className='opacity-50'>Please Approved the request to see the user details.</small>}
                                        </div>
                                        <div>
                                            {resp.status !== "CONFIRMED" ? <div className='' >
                                                {/* {console.log(resp.houseId, )} */}
                                                <span className='btn' onClick={() => { handleAction(resp.id, "CONFIRMED", items[0].addressDetails.area, items[0].addressDetails.city, items[0].ownerDetails.name, items[0].ownerDetails.email, items[0].ownerDetails.phone) }}><Check size={16} /></span>
                                                <span className='btn'><X size={16} /></span>
                                            </div> : <small style={{color: "green"}}>Approved</small>}
                                            <div className='opacity-50'>
                                                <small>{resp.startDate}</small>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </div>
                            </Card>
                        ))
                    ))}
                </Tab>
            </Tabs>
        </>
    )
}

export default Notifications