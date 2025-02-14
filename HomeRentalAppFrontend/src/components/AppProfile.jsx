import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const AppProfile = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  alert("Hello World")

  const handleClose = () => {
    setShow(false)
    navigate("/home")
  };
  return (
    <div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AppProfile