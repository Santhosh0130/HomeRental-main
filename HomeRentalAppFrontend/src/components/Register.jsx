import React, { useState } from 'react'
import axios from 'axios'
import RegisteBackground from '../assets/register_background.svg'
import { Button, Card, Col, Container, FloatingLabel, Form, Image, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();

    const [details, setSetails] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setSetails({...details, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log(details);
        await axios.post("http://localhost:8080/auth/register", details, {
            headers: {
                "Content-Type" : "application/json",
            },
        }).then((response) => {
            if (response.status === 200) navigate("/login")
            else console.log("Email Already in used")
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <Container fluid>
                <Row className='vh-100 d-flex align-items-center justify-content-center'>
                    <Col md={6} className='d-none d-md-block'>
                        <Image src={RegisteBackground} alt='Register Background' />
                    </Col>
                    <Col md={5} >
                        <Card className='shadow w-100' >
                            <Card.Body>
                                <h3 className='text-center'>Sign up</h3>
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel label='Username' controlId='formBasicUsername' className='my-2'>
                                        <Form.Control type='text' placeholder='exaple' name='username' value={details.username} onChange={handleChange}/>
                                    </FloatingLabel>
                                    <FloatingLabel label='Email' controlId='formBasicEmail' className='my-2'>
                                        <Form.Control type='email' placeholder='exaple@example.com' name='email' value={details.email} onChange={handleChange}/>
                                    </FloatingLabel>
                                    <FloatingLabel label='Password' controlId='formBasicPassword' className='my-2'>
                                        <Form.Control type='password' placeholder='exaple' name='password' value={details.password} onChange={handleChange}/>
                                    </FloatingLabel>

                                    <Button variant='color1' type='submit' className='border w-50 mt-3'>Sign up</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Register