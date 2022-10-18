// import avilable slots from the backend then display avilable slots in the form of bus seats
// then when i click on the seat -> pop up a form which have a drop down to select the approved employee from the backend

import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import { Alert } from "reactstrap";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";

// react function component display the avilable slots FROM API

function SlotBooking() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [slot_row, setSlot_row] = useState("");
  const [slot_number, setSlot_number] = useState("");
  const [booked_by, setBooked_by] = useState("");

  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [slots, setSlots] = useState([]);
  const [approvedEmployees, setApprovedEmployees] = useState([]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleModal = () => setModal(!modal);
  const toggleAlert = () => setAlert(!alert);

     // check if user is logined in
     const checkLogin = () => {
      const token = localStorage.getItem("token");
      const admin = localStorage.getItem("admin");
      console.log(token);
      if (token === null || admin === "false") {
          window.location.href = "/admin";
      }
  };

  useEffect(() => {
    checkLogin( )
    axios.get(`http://127.0.0.1:8000/allSlotList/`).then((res) => {
      const slots = res.data;
      setSlots(slots);
      console.log(slots);
    });
    axios.get(`http://127.0.0.1:8000`).then((res) => {
      const approvedEmployees = res.data;
      setApprovedEmployees(approvedEmployees);
      console.log(approvedEmployees);
    });
  }, []);

  // Swal alert when booking down

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
        console.log(slot_row, slot_number, booked_by, email);
        // put method to update the slot status
        axios.post("http://127.0.0.1:8000/slotBooking/", {
            slot_row: slot_row,
            slot_number: slot_number,
            booked_by: booked_by,
            email: email,
        });

        Swal.fire("Booked!", "", "success");
        // refresh the page after 2 seconds
        setTimeout(function () {
            window.location.reload();
            }, 2000);
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
            <h1>Slot Booking</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Slot ID</th>
                  <th>slot Row</th>
                  <th>slot Number</th>
                  <th>slot Status</th>
                  <th>Booked By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* list all slots using slots*/}
                {slots.map((slot) => (
                  <tr>
                    <th scope="row">{slot.id}</th>
                    <td>{slot.slot_row}</td>
                    <td>{slot.slot_number}</td>
                    {/* if slot.is_booked show as booked in green wrap badge else available */}
                    <td>
                      {" "}
                      {slot.is_booked ? (
                        <span class="badge bg-danger">Booked</span>
                      ) : (
                        <span class="badge bg-success">Available</span>
                      )}
                    </td>
                    <td>{slot.booked_by}</td>
                    <td>
                      {/* if slot.is_booked the disable the button else enable */}
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
                        Book
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Book Slot</ModalHeader>
        <ModalBody>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    Select Employee
                </DropdownToggle>
                <DropdownMenu>
                    {approvedEmployees.map((approvedEmployee) => (
                        
                        <DropdownItem onClick={
                            () => {
                                setBooked_by(approvedEmployee.name);
                                setEmail(approvedEmployee.email);
                            }
                        }>
                            {approvedEmployee.name}
                        
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
