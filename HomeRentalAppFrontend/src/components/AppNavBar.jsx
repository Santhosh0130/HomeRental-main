import { Container, Nav, Navbar, NavbarBrand, Offcanvas, Form, Button, InputGroup, Modal, ListGroup } from 'react-bootstrap';
import logo from '../assets/LOGO_rem.png'
import { useContext, useState } from 'react';
import HomeContext from '../context/Context';
import { Link } from 'react-router-dom';

function AppNavBar() {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const { userDetails, signoutHandle } = useContext(HomeContext)


  return (
    <>
      <Modal show={show} onHide={() => { setShow(false) }} >
        <Modal.Header closeButton>
          <div className="d-flex align-items-center">
            <i className="bi bi-person-circle display-6"></i>
            <div className='d-flex flex-column'>
              <span className="fs-4 ms-3">{userDetails[1]}</span>
              <small className="ms-3">{userDetails[0]}</small>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100 d-flex flex-column gap-2 px-3" >
            <div><a href="/home" className=' text-decoration-none text-black'>Home</a></div>
            <div><a href="/about" className=' text-decoration-none text-black'>About</a></div>
            <div><a href="/myHouses" className=' text-decoration-none text-black'>Houses</a></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { signoutHandle() }} className='w-100'>
            Sign Out <i className="bi bi-box-arrow-right"></i>
          </Button>
        </Modal.Footer>

      </Modal>
      <Navbar expand={false} className="bg-color1">
        <Container fluid className='d-flex flex-nowrap'>
          <NavbarBrand className='d-block d-md-none' onClick={handleShow}>
            <div className="d-flex align-items-center">
              <i className="bi bi-person-circle display-6"></i>
              <span className="fs-6 ms-3">Hello {userDetails[1]}</span>
            </div>
          </NavbarBrand>
          <Navbar.Brand href="home" className='fw-bold fs-5 d-none d-md-block'>
            <div className="d-flex align-items-center">
              <img src={logo} alt="Logo" width={40} height={40} className='me-1' />
              <span className="d-none d-md-block">Home Rental & Lease</span>
            </div>
          </Navbar.Brand>

          <div className="d-flex justify-content-end align-items-center gap-3 zindex-5">
            <Nav className=''>
              <Link to={"/filter"} className="btn p-0" >
                <Button style={{
                  border: "1px solid black",
                  width: "100%",
                  fontSize: ".9em",
                  // textDecoration: "none",
                  // color: "black"
                }} className='d-none d-md-block'> Search
                  <i className="bi bi-search ms-3"></i>
                </Button>
                <Button className='d-block d-md-none p-0'>
                <i className="bi bi-search ms-3"></i>
                </Button>
              </Link>
              {/* <InputGroup>
                <Form.Control
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={() => setShowSearch(true)}
                // onFocus={() => setShowSearchFocused(true)}
                // onBlur={(e) => {e.stopPropagation(); setShowSearchFocused(false)}}
                />
                <Button variant="outline-secondary" id="button-addon2">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
              {showSearch &&
                <ListGroup className='position-absolute' style={{ zIndex: 100, width: "14%" }}>
                  <ListGroup.Item onClick={() => alert("Hello")}>Hello 1</ListGroup.Item>
                  <ListGroup.Item>Hello 2</ListGroup.Item>
                  <ListGroup.Item>Hello 3</ListGroup.Item>
                </ListGroup>
              } */}
            </Nav>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${false}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
              placement="end"
              style={{width: "300px"}}
            >
              <Offcanvas.Header closeButton>
                <div className="d-flex align-items-center">
                  <img src={logo} alt="Logo" width={40} height={40} className='me-2' />
                  <span>Home Rental & Lease</span>
                </div>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className=''>
                  <Nav.Link href="/home">Dashboard</Nav.Link>
                  <Nav.Link href="/cart">Favorites</Nav.Link>
                  <Nav.Link href="/myHouses">My Houses</Nav.Link>
                  <Nav.Link href="/filter">Filter</Nav.Link>
                  <Nav.Link href="/addHouse">Add House</Nav.Link>
                  <Nav.Link href="/ownerRegister">Owner's Registration</Nav.Link>
                  <Nav.Link onClick={handleShow}>
                    <span className='d-none d-md-block'>Profile</span>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>

        </Container>
      </Navbar>


      {/* // <Navbar expand="lg" className="bg-body-tertiary">
    //   <Container>
    //     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-0">
    //         <Nav.Link href="#home">Home</Nav.Link>
    //         <Nav.Link href="#link">Link</Nav.Link>
    //         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">
    //             Another action
    //           </NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action/3.4">
    //             Separated link
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar> */}
    </>
  );
}

export default AppNavBar;
