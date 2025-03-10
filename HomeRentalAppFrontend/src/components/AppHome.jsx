import { React, useContext, useEffect, useState } from 'react'
import AppCard from './AppCard.jsx'
import AppCarousal from './react-components/AppCarousal.jsx'
import { Col, Container, Row } from 'react-bootstrap';
import HomeContext from '../context/Context.jsx';
import FloatingButton from './react-components/FloatingButton.jsx'
import { useLocation } from 'react-router-dom';

function AppHome() {
    const { addHouseHandle } = useContext(HomeContext)
    const location = useLocation();
    const [sliceVal1, setSliceVal1] = useState(9);
    const [sliceVal2, setSliceVal2] = useState(9);
    const [sliceVal3, setSliceVal3] = useState(9);
    useState(() => {
        if (location.pathname === "/home" || location.pathname === "/") addHouseHandle(true);
        else addHouseHandle(false);
    }, [])

    const { data, isAddHouse } = useContext(HomeContext)
    // console.log(data)
    useEffect(() => {
        if (data.length === 0 && location.pathname !== "/home") window.location.reload();
    }, [])
    return (
        <div>
            <AppCarousal />
            {data.length === 0 ? 
            <h3 className='text-center my-5'>No Data Found...</h3> 
            : <Container>
                <Row>
                <div className="opacity-75 border-bottom py-2 display-6">Recently Posted</div>
                    {data.slice(0, sliceVal1).map((item, index) => (
                        <Col md={6} lg={4} key={index}>
                            <AppCard datavalue={item} />
                        </Col>))}
                </Row>
                {sliceVal1 > 9 && <Row>
                    <Col sm={4} className='d-flex justify-content-center align-items-center my-3 w-100'>
                        <small className='btn' onClick={() => { setSliceVal1(sliceVal1 + 6) }}>Load More...</small>
                    </Col>
                </Row>}
                <Row>
                <div className="opacity-75 border-bottom py-2 display-6 mt-5">In Madurai</div>
                {data.filter(cityName => cityName.addressDetails.city === "Madurai").slice(0, sliceVal2).map((item, index) => (
                        <Col md={6} lg={4} key={index}>
                            <AppCard datavalue={item} />
                        </Col>))}
                </Row>
                {sliceVal2 > 9 && <Row>
                    <Col sm={4} className='d-flex justify-content-center align-items-center my-3 w-100'>
                        <small className='btn' onClick={() => { setSliceVal2(sliceVal2 + 6) }}>Load More...</small>
                    </Col>
                </Row>}
                <Row>
                <div className="opacity-75 border-bottom py-2 display-6 mt-5">2 BHK Houses</div>
                {data.filter(cityName => cityName.houseDetails.bhk === 2).slice(0, sliceVal3).map((item, index) => (
                        <Col md={6} lg={4} key={index}>
                            <AppCard datavalue={item} />
                        </Col>))}
                </Row>
                {sliceVal3 > 9 && <Row>
                    <Col sm={4} className='d-flex justify-content-center align-items-center my-3 w-100'>
                        <small className='btn' onClick={() => { setSliceVal3(sliceVal3 + 6) }}>Load More...</small>
                    </Col>
                </Row>}
            </Container>}
            {isAddHouse ? <FloatingButton /> : null}
        </div>
    )
}

export default AppHome