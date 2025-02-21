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
            <Container>
                <Row>
                    {data.slice(0, 6).map((item, index) => (
                        <Col md={6} lg={4} key={index}>
                            <AppCard datavalue={item} />   
                        </Col>))}
                </Row>
            </Container>
            {isAddHouse ? <FloatingButton /> : null}
        </div>
    )
}

export default AppHome