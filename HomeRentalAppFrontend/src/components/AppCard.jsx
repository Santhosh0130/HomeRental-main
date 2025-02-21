import { Button, Card } from 'react-bootstrap/';
import one from '../assets/Houses/home-1.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import HomeContext from '../context/Context';

function AppCard({ datavalue }) {

    const { getCart, addToCart, removeFromCart, cart } = useContext(HomeContext)
    const userId = localStorage.getItem("userId");
    // const [cartData, setCartData] = useState({
    //     userId: localStorage.getItem("userId"),
    //     houseId: datavalue.houseId,
    // });
    const [showFav, setShowFav] = useState()

    useEffect(() => {
        if (cart != null) {
            setShowFav(cart.includes(datavalue.houseId))
            // console.log(cart)
        }
    }, [])


    const handleFav = () => {
        setShowFav(showFav ? false : true)
        if (!showFav) {
            console.log("Adding ", showFav)
            // getCart();
            addToCart(userId, datavalue.houseId);
        } else {
            console.log("Removing")
            // getCart();
            removeFromCart(userId, datavalue.houseId);
        }
    }

    useEffect(() => {
        // console.log("Change the cart.")
        getCart()
    }, [showFav]);

    // useEffect(() => {
    //     if (showFav) {
    //         console.log("Adding ", showFav)
    //         addToCart(userId, datavalue.houseId);
    //     } else {
    //         console.log("Removing")
    //         removeFromCart(userId, datavalue.houseId);
    //     }
    // }, [showFav])

    return (
        <>
            <Card className='m-3 shadow'>
                {datavalue.thumbnails === null ? <Card.Img variant="top" src={one} /> : <Card.Img variant="top" style={{ width: "100%", height: "200px", objectFit: "cover" }} src={`http://localhost:8080/products/${datavalue.houseId}/thumbnails/${0}`} />}


                <Card.ImgOverlay className='d-flex justify-content-end align-items-start z-index-1000'>
                    <Button variant='color1' className='d-flex justify-content-center align-items-center' style={{ width: "15%", height: "10%", fontSize: ".8em" }} onClick={handleFav}>{showFav ? (<i className="bi bi-heart-fill"></i>) : (<i className="bi bi-heart"></i>)}</Button>
                </Card.ImgOverlay>
                <Card.Body>
                    {/* <Card.Title to={`/det/${datavalue.houseId}`}> */}
                    {/* <div className='d-flex justify-content-between align-items-center'>
                                <h5>{datavalue.addressDetails.city} City</h5>
                                <small> ₹ {datavalue.houseDetails.rent}</small>
                                {/* <Container>
                                <Row className="d-flex justify-content-between align-items-center">
                                    <Col xs={8}>
                                        <div>{datavalue.name}</div>
                                    </Col>
                                    <Col xs={4} className='text-end'>
                                        <div className='fs-6'> ₹ {datavalue.amt}</div>
                                    </Col>
                                </Row>
                            </Container> */}
                    {/* </div> */}
                    {/* </Card.Title> */}
                    <Link to={`/det/${datavalue.houseId}`} className='text-decoration-none text-black'>
                        <Card.Text>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h5>{datavalue.addressDetails?.city} City</h5>
                                <small> ₹ {datavalue.houseDetails?.rent}</small>
                                {/* <Container>
                                <Row className="d-flex justify-content-between align-items-center">
                                    <Col xs={8}>
                                        <div>{datavalue.name}</div>
                                    </Col>
                                    <Col xs={4} className='text-end'>
                                        <div className='fs-6'> ₹ {datavalue.amt}</div>
                                    </Col>
                                </Row>
                            </Container> */}
                            </div>
                            <div className="d-flex justify-content-evenly py-2 my-2 fs-6 opacity-75 border rounded">
                                <small>{datavalue.houseDetails?.bhk} BHK</small>
                                {/* <small>{datavalue.houseDetails.furnished}</small> */}
                                <small className='text-capitalize'>{datavalue.houseDetails?.type}</small>
                            </div>
                            <div className="d-flex gap-1 fs-6 px-2 py-1 opacity-50">
                                <i className="bi bi-geo-alt-fill opacity-50"></i>
                                {datavalue.addressDetails?.district}
                            </div>
                        </Card.Text>
                    </Link>
                    {/* <div className="d-flex justify-content-between">
                        <Button className='bg-color1' onClick={() => {alert("Hello")}}>Go</Button>
                        <Button variant='primary' onClick={setFav(fav ? false : true)}>{fav ? (<i class="bi bi-heart"></i>) : (<i class="bi bi-heart-fill"></i>)}</Button>
                    </div> */}
                </Card.Body>
            </Card >
        </>
    );
}

export default AppCard;