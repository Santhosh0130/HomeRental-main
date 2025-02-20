import Carousel from 'react-bootstrap/Carousel';
import one from '../../assets/Houses/home-1.jpg'
import two from '../../assets/Houses/home-2.jpg'
import three from '../../assets/Houses/home3.jpg'
import { Container, Row, Col } from 'react-bootstrap';

function AppCarousal() {
    return (
        <Container fluid>
            <Row className='justify-content-center align-items-center '>
                <Col xxl={8}>
                    <Carousel>
                        <Carousel.Item>
                            <img src={one} alt="" className='d-block w-100' />
                            <Carousel.Caption>
                                <h3>100+ Home Lease's</h3>
                                <p className='d-none d-sm-block'>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={two} alt="" className='d-block w-100' />
                            <Carousel.Caption>
                                <h3>500+ Home Rental's</h3>
                                <p className='d-none d-sm-block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={three} alt="" className='d-block w-100' />
                            <Carousel.Caption>
                                <h3>1000+ Houses</h3>
                                <p className='d-none d-sm-block'>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <div className="text-center my-5">
                <h3 className="display-4">Home Rental and Leasing App</h3>
                <p className="lead text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, harum?</p>
            </div>
            <Container>
                <div className="opacity-75 text-center border-bottom py-2 display-6">Recently Posted</div>
            </Container>
        </Container>
    );
}

export default AppCarousal;