import React, { useContext, useEffect, useState } from 'react'
import HomeContext from '../context/Context'
import AppCard from './AppCard'
import { Container, Row, Col } from 'react-bootstrap'

function AppFav() {
    const { data } = useContext(HomeContext)
    return (
        <>
            {<Container>
                <Row>
                    {data.map((item, index) => (item.favourites &&
                        <Col md={6} lg={4} key={index}>
                            <AppCard datavalue={item} />
                        </Col>
                    ))}
                </Row>
            </Container>}
        </>
    )
}

export default AppFav