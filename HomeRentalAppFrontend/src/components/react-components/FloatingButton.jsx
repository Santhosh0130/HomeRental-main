import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import HomeContext from "../../context/Context";

const FloatingButton = () => {
  const navigate = useNavigate();
  const { addHouseHandle } = useContext(HomeContext)

  const buttonHandle = () => {
    // addHouseHandle(false)
    navigate("/addHouse")
  }

  const buttonStyle = {
    width: "50px",
    height: "50px",
    position: "fixed",
    bottom: "30px",
    right: "30px",
    zIndex: 1000,
    padding: "0",
    textAlign: "center",
    borderRadius: "30%"
  };

  return (
    <>
      <Button variant="color1" style={buttonStyle} onClick={buttonHandle}>
        +
      </Button>
    </>
  );
};

export default FloatingButton;
