import React, { useContext, useState } from 'react'
import axios from 'axios'
import RegisteBackground from '../assets/register_background.svg'
import { Button, Card, Col, Container, FloatingLabel, Form, Image, InputGroup, Placeholder, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import HomeContext from '../context/Context'

const Register = () => {
    const navigate = useNavigate();

    const { API } = useContext(HomeContext)

    const [OTP, setOTP] = useState("")
    const [message, setMessage] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [isLoading, setLoading] = useState(false);

    const [showOTP, setShowOTP] = useState(false)
    const [validEmail, setValidEmail] = useState(false)

    const [details, setDetails] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
    });

    const handleChange = (e) => {
        setUsernameError("")
        setDetails({ ...details, [e.target.name]: e.target.value })
        if (e.target.name === "email") {
            setDetails({ ...details, email: e.target.value })
            setValidEmail(validateEmail(e.target.value))
            // console.log("emailSetted")
        }
    }

    // const handleEmailChange = (e) => {
    //     const inputEmail = e.target.value;
    //     setEmail(inputEmail);
    // }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email);
    }

    const handleVerify = async (e) => {
        e.preventDefault();

        setLoading(true);
        await axios.post(API + `auth/send_otp?email=${details.email}`)
            .then((response) => {
                setShowOTP(true)
                setValidEmail(false)
                setMessage(response.data)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setShowOTP(false)
                setValidEmail(true)
                setLoading(false)
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(details);
        await axios.post(API + `auth/register?otp=${OTP}`, details, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if(response.data) navigate("/login")
            else setUsernameError("Alrady used.")
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
                                        <Form.Control required type='text' placeholder='exaple' name='username' value={details.username} onChange={handleChange} />
                                    </FloatingLabel>
                                    <small style={{ color: "red", fontSize: ".7em" }}>{usernameError}</small>
                                    <FloatingLabel label='Password' controlId='formBasicPassword' className='my-2'>
                                        <Form.Control required type='password' placeholder='exaple' name='password' value={details.password} onChange={handleChange} />
                                    </FloatingLabel>

                                    <InputGroup className='my-2'>
                                        <FloatingLabel label='Email' controlId='formBasicEmail'>
                                            <Form.Control required type='email' placeholder='exaple@example.com' name='email' value={details.email} onChange={handleChange} />
                                        </FloatingLabel>
                                        <Button variant='outline' onClick={handleVerify} disabled={isLoading} className='border'>{isLoading ? <i className="bi bi-arrow-clockwise" /> : <i className="bi bi-check2" />}</Button>
                                    </InputGroup>

                                    <FloatingLabel label='Phone' controlId='formBasicPhone' className='my-2'>
                                        <Form.Control required type='phone' placeholder='exaple@example.com' name='phone' value={details.phone} onChange={handleChange} />
                                    </FloatingLabel>

                                    {showOTP && <>
                                        <small style={{ color: "red", fontSize: ".7em" }}>{message}</small>
                                        <FloatingLabel label="OTP" controlId='formBasicOTP' className='my-2' >
                                            <Form.Control type='text' maxLength={6} placeholder='123456' autoFocus name="otp" value={OTP} onChange={(e) => setOTP(e.target.value)} />
                                        </FloatingLabel>
                                    </>}

                                    <div className='d-flex gap-3 align-items-center mt-3'>
                                        {/* {validEmail && <Button variant='color1' onClick={handleVerify} disabled={isLoading} className='border'>{isLoading ? "Loading.." : "Send OTP"}</Button>} */}
                                        {OTP.length === 6 ? <Button variant='color1' type='submit'>Sign Up</Button> : <Button variant='color1' disabled={true}>Sign Up</Button>}
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

export default Register