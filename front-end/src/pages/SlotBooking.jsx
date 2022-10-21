// import avilable slots from the backend then display avilable slots in the form of bus seats
// then when i click on the seat -> pop up a form which have a drop down to select the approved employee from the backend


import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import { Table } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Loderfun from "../components/Loader";




// react function component display the avilable slots FROM API

function SlotBooking() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [slot_row, setSlot_row] = useState("");
  const [slot_number, setSlot_number] = useState("");
  const [booked_by, setBooked_by] = useState("");
  const [user_mail, setUser_mail] = useState("");
  const navigate = useNavigate();

  // use state for loader 
  const [loader, setLoader] = useState(false);

  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [slots, setSlots] = useState([]);
  const [approvedEmployees, setApprovedEmployees] = useState([]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleModal = () => setModal(!modal);

  // to close the modal when booking is done 
  const closemodal = () => setModal(false);

  // slot lock by user (not booked)
  const [slotLock, setSlotLock] = useState("Select Emloyee");


     // check if user is logined in
     const checkLogin = () => {
      setLoader(true);
      const token = localStorage.getItem("token");
      const admin = localStorage.getItem("admin");
      console.log(token);
      if (token === null || admin === "false") {
          navigate("/admin");
      }
  };

  useEffect(() => {
    checkLogin( )
    // fetch slots from the backend
    axios.get(`https://emp-api.jassy.in/allSlotList/`).then((res) => {
      
      const slots = res.data;
      setSlots(slots);
      setLoader(false);
    });


    // fetch approved approved employees from the backend
    axios.get(`https://emp-api.jassy.in/`).then((res) => {
      const approvedEmployees = res.data;
      setApprovedEmployees(approvedEmployees);
    }).then(() => {
      console.log("emp loader");
      setLoader(false);
    });

  }, [])  

  // function to refresh the data after a booking or a cancel
  const refreshData = () => {
    // update the list of slots by updating the state from the backend
    axios.get(`https://emp-api.jassy.in/allSlotList/`).then((res) => {
      const slots = res.data;
      setSlots(slots);
    });
  };


  // Slot clean up
  const slotCleanUp = (id, row, number) => {
    console.log(row);
    console.log(number);
    console.log(id);
    Swal.fire({
      title: "Are you sure ?",
      text: "This Slot will become free!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`https://emp-api.jassy.in/slotCleanUp/`, {
          id: id,
          slot_row: row,
          slot_number: number,
        });
      
        // if ok then reload the page
        Swal.fire("Deleted!", "Your Slot has been deleted.", "success"
        ).then(() => {
          // refresh the slots by updateing the state
          refreshData();
          navigate("/slotBooking");
        }
        );
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Slot is safe :)", "error");
      }
    });
  };

  // Slot booking 
  const bookingAlert = () => {
    Swal.fire({
      title: "You want to book this slot ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {

        // check if the put data is correct or not
        if (setSlots === undefined) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please select an employee!",
          });
        } else {

        // using put method to update the slot status
        console.log(slot_row, slot_number, booked_by, user_mail);
        // put method to update the slot status
        axios.post("https://emp-api.jassy.in/slotBooking/", {
            slot_row: slot_row,
            slot_number: slot_number,
            booked_by: booked_by,
            user_mail: user_mail,
        });
        refreshData();
        Swal.fire("Booked!", "", "success").then(() => {
          // refresh the slots by updateing the state
          refreshData();
        // autoclose the modal that opned by seting modal state flase
          closemodal();
          navigate("/slotBooking");
        }
        );
        
    }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "", "error");
      }
    });


  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1 className="text-center text-danger p-4">Slot Booking</h1>
          </Col>
        </Row>

        {/* loader here if Loder state is true*/}
      {loader ? 
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
      <Loderfun />
      </div> : 

        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th style={{fontSize: "15px", fontWeight: "bolder"}}>Slot ID</th>
                  <th style={{fontSize: "15px", fontWeight: "bolder"}}>Slot </th>
                  <th style={{fontSize: "15px", fontWeight: "bolder"}}>slot Status</th>
                  <th style={{fontSize: "15px", fontWeight: "bolder"}}>Booked By</th>
                  <th style={{fontSize: "15px", fontWeight: "bolder"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* list all slots using slots*/}
                {slots.map((slot) => (
                  <tr>
                    <th scope="row">{slot.id}</th>
                    <td><span class="badge bg-info" style={{fontSize: "15px"}}>{slot.slot_row} {slot.slot_number}</span></td>
                    {/* if slot.is_booked show as booked in green wrap badge else available */}
                    <td>
                      {" "}
                      {slot.is_booked ? (
                        <span class="badge bg-danger" style={{fontSize: "15px"}}>Booked</span>
                      ) : (
                        <span class="badge bg-success" style={{fontSize: "15px"}}>Available</span>
                      )}
                    </td>
                    {/* show slot.booked_by else show not booked in green badge */}
                    <td>
                      {slot.booked_by ? (
                        <span style={{fontSize: "15px"}}>
                          {/* display profile picture by checking approvedEmployees by filtering with slot.user_mail */}
                          <div className="row">
                            <div className="col-2">
                          {approvedEmployees.filter((employee) => employee.email === slot.user_mail)
                            .map((employee) => (
                              <img src={"https://emp-api.jassy.in"+employee.profile_pic} alt="profile" style={{width: "50px", height: "50px", borderRadius: "50%"}} />
                            ))}
                            </div>
                            <div className="col-10">
                          <b>{slot.booked_by}</b><br/>
                          {slot.user_mail}
                          </div>
                          </div>
                        </span>
                      ) : (
                        <span style={{fontSize: "15px"}} class="badge bg-success">Not Booked</span>
                      )}
                    </td>


                    <td>
                      {/* if slot.is_booked then buttn for clen the slot */}
                      {slot.is_booked ? (
                        <Button
                          color="info"
                          onClick={() =>
                            slotCleanUp(slot.id, slot.slot_row, slot.slot_number)
                          }
                        >
                          Make slot free
                        </Button>
                      ) : (
                        // else button for booking the slot
                      <Button
                        color="primary"
                        disabled={slot.is_booked}
                        // onclick - toggleModal, setslot_row, setslot_number, setbooked_by
                        onClick={() => {
                            setSlot_row(slot.slot_row);
                            setSlot_number(slot.slot_number);
                            
                            toggleModal();
                        }}
                      >
                        Book Slot 
                      </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
} 
      </Container>
      <Modal  isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Book Slot</ModalHeader>
        <ModalBody>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {slotLock} 
                </DropdownToggle>

                <DropdownMenu> 
                    {approvedEmployees.map((approvedEmployee) => (
                        
                        <DropdownItem onClick={
                            () => {
                                setBooked_by(approvedEmployee.name);
                                setUser_mail(approvedEmployee.email);
                                setSlotLock(approvedEmployee.name);
                            }
                        }>
                            {/* list employee name  */}
                            <span className="row">
                            <img className="col-4" style={{borderRadius: '20%'}} src={'https://emp-api.jassy.in'+ approvedEmployee.profile_pic} height="50px" alt="dp not found"/>
                            <div className="col-6">
                            
                              <b>{approvedEmployee.name} ( {approvedEmployee.age} )</b>
                            <p style={{fontSize: "12px", fontStyle: "italic"}}><b>{approvedEmployee.designation}</b><br style={{fontSize: "12px", fontStyle: "normal"}}/>{approvedEmployee.email} </p>

                            </div>
                            </span>
                            </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </ModalBody>
        <ModalFooter>
          {/* on book button click put the status to api */}
          <Button color="primary" onClick={bookingAlert}>
            Book
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SlotBooking;
