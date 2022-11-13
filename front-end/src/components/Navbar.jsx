import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';






function NavbarBootstrap() {

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  }

  const [data, setData] = useState([]);

  // Fetch Data from django api
  useEffect(() => {
    localStorage.getItem('admin')
    localStorage.getItem('token')
    Axios.get("https://emp-api.jassy.in/navbarCounter/").then((response) =>{
      setData(response.data)
      console.log(response.data)
  }
    )}
, []);



  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='rounded mb-3'>
      <Container >
      {localStorage.getItem('admin') ? (
        <a className='navbar-brand'>Emp Admin</a>
        ) : 
        <Link to='/' className='navbar-brand'>Emp App</Link>
        }

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">  

            {localStorage.getItem('token') ? (
            <Link className='nav-link' to="/list">Approved ( {data?.approved_users} )</Link>
            ) : null}

            {localStorage.getItem('token') ? (
            <Link className='nav-link' to="/PendingList">Pending ( {data?.pending_users} )</Link>
            ) : null}

            {localStorage.getItem('token') ? (
            <Link className='nav-link' to="/RejctedList">Rejected ( {data?.rejected_users} )</Link>
            ) : null}
            

            {/* <Link className='nav-link' to="/PendingList">Pending ( {data?.pending_users} )</Link>,
            <Link className='nav-link' to="/RejctedList">Rejected ( {data?.rejected_users} )</Link>,
            <Link className='nav-link' to="/add"> Register Employee  </Link>
            
            <Link className='nav-link' to="/list">Approved </Link>,
            <Link className='nav-link' to="/PendingList">Pending</Link>,
            <Link className='nav-link' to="/RejctedList">Rejected </Link>,
            <Link className='nav-link' to="/add"> Register Employee  </Link> */}
           
            {/* check if logined user is admin */}
            {localStorage.getItem('admin') ? (
            <Link className='nav-link' to="/SlotBooking"> Slot Booking </Link>
            
            ) : null}

            {localStorage.getItem('admin') ? (
            <Link className='nav-link' to="/AdminPage"> Admin Console </Link>
            ) : null}

          </Nav>

          {localStorage.getItem('token') ? (
                  <button className='btn btn-warning mx-3' onClick={()=> logout()}> Logout  </button>
          ) : (
           (
            // <Link  to="/login"><button className='btn btn-info mx-3'> Login  </button></Link>,
          <Link  to="/register"> <button className='btn btn-danger mx-3'> Register  </button></Link>
          )
          
          )} 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavbarBootstrap;