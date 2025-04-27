import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo1 from '../assets/images/logo1.png';

export default function Navbarr() {
  return (
    <Navbar className='bg-body-tertiary'>
        <Navbar.Brand href="/" className='AppTitle'>الخير</Navbar.Brand>
      <Container fluid className=" justify-content-between">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {/* إزالة خاصية inline من Form */}
            <Form className="d-flex">
            </Form>
            <Form className="d-flex ">
              <Nav.Link href='/information' className='greenItem'>عن ثواب الصدقة</Nav.Link>
              {/* <Nav.Link href="/Others">المشاريع الاخرى</Nav.Link> */}
              <Nav.Link href="/Free">فرجت</Nav.Link>
              <Nav.Link href="/Easy" >تيسرت</Nav.Link>
              <Nav.Link href="/help">إغاثة ملهوف</Nav.Link>
              <Nav.Link href="/Others"> مشاريع أخرى</Nav.Link>
              <Nav.Link href="/Actions">مبادرات </Nav.Link>
              </Form>
            <Form className="d-flex ">

              <Nav.Link href="/">الصفحة الرئيسية</Nav.Link>
              <Nav.Link href='/login'>تسجيل الدخول</Nav.Link>
              <NavDropdown  id="navbarScrollingDropdown" className='ScrollingDropdown' href="/login">
                <NavDropdown.Item href="/map" className='ScrollingDropdown'>مراكزنا</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/finshed" className='ScrollingDropdown'>
                  منجزات الموقع
                </NavDropdown.Item>
              </NavDropdown>
            </Form>
              <Nav.Link className='logo' href='/'> <img className='logo' src={logo1} alt="Logo1" /> </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// export default Navbarr;
