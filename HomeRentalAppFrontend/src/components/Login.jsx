import React, { useContext, useState } from 'react'
import { Button, Card, Col, Container, FloatingLabel, Form, Image, Row } from 'react-bootstrap'
import LoginBackground from '../assets/login_background_2.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import HomeContext from '../context/Context';

const Login = ({refreshAuth1}) => {
    const navigate = useNavigate();

    const [details, setDetails] = useState({
        username: 'san',
        password: '123',
        // remember: false,
    });

    const {API, refreshAuth} = useContext(HomeContext)

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleCheck = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.checked })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(details);
        await axios.post(API + "auth/login", details, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            // alert("Sign in Successful");
            refreshAuth1();
            navigate("/")
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <Container fluid>
                <Row className='vh-100 d-flex align-items-center justify-content-center'>
                    <Col sm={6} ls={4} className='d-none d-md-block' >
                        <Image src={LoginBackground} alt='Login Background Image'></Image>
                    </Col>
                    <Col md={5} className='d-flex align-items-center justify-content-center'>
                        <Card className='shadow p-2 w-100'>
                            <Card.Body className=''>
                                <h3 className='text-center mb-4'>Login</h3>
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel controlId='formBasicUsername' label="Username" className='my-2 w-100'>
                                        <Form.Control type='text' placeholder='example@email.com' value={details.username} name='username' onChange={handleChange} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId='formBasicPassword' label="Password" className='my-2 w-100'>
                                        <Form.Control type='password' placeholder='example@email.com' value={details.password} name='password' onChange={handleChange} />
                                    </FloatingLabel>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <Button variant='color1' type='submit' className='px-4 my-4 border' >Sign In</Button>
                                        {/* <Form.Check type='checkbox' label='Remember Me?' checked={details.remember} name='remember' onChange={handleCheck} /> */}
                                    </div>
                                    <div className="text-center">
                                        <small>Don't have an account? <a href="/register">Sign up</a></small>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login