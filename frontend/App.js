import "regenerator-runtime/runtime";
import React, { useState, useRef, useEffect } from "react";

import {
  login,
  logout,
  get_greeting,
  set_greeting,
} from "./assets/js/near/utils";
import getConfig from "./assets/js/near/config";

import "bootstrap/dist/css/bootstrap.min.css";

// bootstrap
import { Container, Row, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

//components
import UpoadImage from "./Components/UpoadImage";
import Home from "./Components/Home";
import AltHome from "./Components/AltHome";

//react router

import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import Owned from "./Components/Owned";

export default function App() {
  const [images, setImages] = React.useState([]);
  const [altHome, changeAltHome] = React.useState(<AltHome />);
  const [isOwner, changeIsOwner] = useState(false);
  useEffect(() => {
    const getOwner = async () => {
      let isOwner = await window.contract.get_contract_owner();
      changeIsOwner(isOwner === window.accountId);
      console.log("activate");
    };
    getOwner();
  }, []);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  useEffect(() => {
    const getInfo = async () => {
      let getList = await window.contract.get_name_vector();
      getList.length === 0 ? null : changeAltHome(false);
    };
    getInfo();
  }, []);
  return (
    <HashRouter>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>NEAR Clothes Store</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Container>
                <Col>
                  {isOwner ? <Link to='/newproduct'> Add Item</Link> : null}
                </Col>{" "}
                <Col>
                  <Link to='/'>Shop</Link>
                </Col>
                <Col>
                  <Link to='/owned'>Owned</Link>
                </Col>
              </Container>
            </Nav>
            <Nav>
              <Nav.Link
                onClick={window.walletConnection.isSignedIn() ? logout : login}
              >
                {window.walletConnection.isSignedIn()
                  ? window.accountId
                  : "Login"}
              </Nav.Link>{" "}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path='/newproduct' exact element={<UpoadImage />} />
          <Route path='/Owned' exact element={<Owned />} />
          <Route path='/' exact element={altHome ? <AltHome /> : <Home />} />
        </Routes>
      </Container>
    </HashRouter>
  );
}
