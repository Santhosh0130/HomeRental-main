import React, { useContext, useEffect, useRef, useState } from 'react'
import HomeContext from '../context/Context'
import AppCard from './AppCard'
import { Container, Row, Col, Image } from 'react-bootstrap'
import NoResults from '../assets/no_results.svg'

function AppCart() {
    const { data, cart } = useContext(HomeContext)
    const [cartData, setCartData] = useState([]);

    useEffect(() => {    
        // Filter houses that exist in the cart
        const matchedHouses = data.filter((house) => cart.includes(String(house?.houseId)));
        
        setCartData(matchedHouses);
      }, [data, cart]);
    return (
        <>
            {<Container>
                <Row>
                    {cartData.length > 0 ?
                            cartData.map((item, index) => (
                                <Col md={6} lg={4} key={index}>
                                    <AppCard datavalue={item} />
                                </Col>
                            )) :
                        (<div className='d-flex flex-column justify-content-center align-items-center'>
                            <Image src={NoResults} width={500} />
                            <h4 className='text-color5'>OOPS... NO RESULTS FOUND.</h4>
                        </div>)}
                </Row>
            </Container>}
        </>
    )
}

export default AppCart