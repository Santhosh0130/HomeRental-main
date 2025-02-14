import { Button, Card } from 'react-bootstrap/';
import one from '../assets/Houses/home-1.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import HomeContext from '../context/Context';

function AppCard({ datavalue }) {

    const { updateFav } = useContext(HomeContext)

    function handleFav() {
        setShowFav(showFav ? false : true)
        updateFav(datavalue.id, !showFav)
    }

    const [showFav, setShowFav] = useState(datavalue.favourites)
    return (
        <>
            <Card className='m-3'>
                {datavalue.thumbnails.length === 0 ? <Card.Img variant="top" src={one} /> : <Card.Img variant="top" src={`http://localhost:8080/products/${datavalue.product_id}/thumbnails/${0}`} />}
                

                <Card.ImgOverlay className='d-flex justify-content-end align-items-start'>
                    <Button variant='primary' className='text-black text-bg-color2 fs-6' onClick={handleFav}>{showFav ? (<i className="bi bi-heart-fill"></i>) : (<i className="bi bi-heart"></i>)}</Button>
                </Card.ImgOverlay>
                <Link to={`/det/${datavalue.product_id}`} className='text-decoration-none text-black'>
                    <Card.Body>
                        <Card.Title>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>{datavalue.name}</div>
                                <div className='fs-6'> ₹ {datavalue.amt}</div>
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
                        </Card.Title>
                        <Card.Text>
                            <div className="d-flex justify-content-evenly py-2 my-4 fs-6 opacity-75 border rounded">
                                <div>{datavalue.sqrt} sqft</div>
                                <div>{datavalue.furniture ? "furnished" : "Unfurnished"}</div>
                                <div>{datavalue.type}</div>
                            </div>
                            <div className="d-flex gap-1 fs-6 px-2 py-1 opacity-50">
                                <i className="bi bi-geo-alt-fill opacity-50"></i>
                                {datavalue.address[0].district}
                            </div>
                        </Card.Text>
                        {/* <div className="d-flex justify-content-between">
                        <Button className='bg-color1' onClick={() => {alert("Hello")}}>Go</Button>
                        <Button variant='primary' onClick={setFav(fav ? false : true)}>{fav ? (<i class="bi bi-heart"></i>) : (<i class="bi bi-heart-fill"></i>)}</Button>
                    </div> */}
                    </Card.Body>
                </Link>
            </Card>
        </>
    );
}

export default AppCard;