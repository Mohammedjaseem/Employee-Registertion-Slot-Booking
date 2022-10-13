import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function NavbarBootstrap() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='rounded mb-3'>
      <Container >
        <Navbar.Brand href="#home">Employee Data</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className='nav-link' to="/">Employees List </Link>
            <Link className='nav-link' to="/add"> Register Employee  </Link>
            {/* <Link className='nav-link' to="/update/2"> Update Data</Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBootstrap;