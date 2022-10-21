
import React, { useEffect, useState } from "react";
import './HomePage.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

export default function PersonalProfile() {

  const [user, setUser] = useState([]);
  const [booked, setBooked] = useState("");
  const [slot_row, setSlotRow] = useState("");
  const [slot_number, setSlotNumber ] = useState("");
  const navigate = useNavigate();

  // modal settings
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  // user deatils edit
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email_for_fetch_details"));
  const [designation, setDesignation] = useState("");
  const [profile_pic, setProfile_pic] = useState(null);


  // function to check if user is logged in basked on token in local storage token
  function checkLogin() {
    if (localStorage.getItem("token") === null) {
      // navigate('/login') // this is work but shows the swal pop of profile not updated hence i used the below code
      window.location.href = "/login";
    }
  }

  // check if the user has any allowed slot by checking the slot api
  function checkSlot() {
    const  email  = localStorage.getItem("email_for_fetch_details");
    axios.get("https://emp-api.jassy.in/isSlotAlloted/", {
      params: {
        email: email
      }
    }).then((response) => {
      setBooked(response.data.booked);
      setSlotRow(response.data.slot_row);
      setSlotNumber(response.data.slot_number);      
    })
  }

  // function to fetch user details
  function fetchUserDetails ()  {
    // works only if user is logged in
    checkLogin();
    const  email  = localStorage.getItem("email_for_fetch_details");
    axios.get("https://emp-api.jassy.in/user/", {
      params: {
        email: email
      }
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        // swal popup to show error and on confirm navigate to login page
        Swal.fire({
          title: "Error",
          text: "Looks Like you are not updated your profile yet",
          icon: "error",
          confirmButtonText: "Update my profile",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem("reg_mail", email);
            navigate('/add')
          }
        });

      });
  }
  
  // by email get user details 
  useEffect(() => {
    checkLogin();
    fetchUserDetails();
    checkSlot();
    
  }, []);


  

  // img file handles
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  // on file upload show file name
  const onChangeFileUpload = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };


  // Input Change Handler
  const changeHandler = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "age") {
      setAge(event.target.value);
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "designation") {
      setDesignation(event.target.value);
    }
  };


  // Submit Form
  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("email", email);
    formData.append("designation", designation);
    formData.append("profile_pic", file);

    try {
      const res = await axios.post("https://emp-api.jassy.in/editEmployee/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      Swal.fire({
        title: "Profile Updated",
        text: "Your Profile has been updated",
        icon: "success",
        confirmButtonText: "Ok",
      });
      // refesh the emp data 
      fetchUserDetails();
      // autoclose the modal that opned by seting modal state flase
      handleClose ();
      // after ok button clicked redirect to login page after 2 seconds
      setTimeout(() => {
         navigate('/')
      }, 2000);
      
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }  

  };

  return (
   



    <section className="vh-50" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-50">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="12" className="mb-2 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    {/* display user image */}
                  <MDBCardImage src={"https://emp-api.jassy.in/"+ user?.profile_pic}
                    alt="Avatar" className="my-5" style={{ width: '150px', height: '150px', borderRadius: '20%' }} fluid />
                    {/* map usr names  */}
              
                  <MDBTypography tag="h5">{user?.name}</MDBTypography>
                  
                  <MDBCardText>{user?.designation}</MDBCardText>
                  {/* <MDBIcon far icon="edit mb-5" /> */}
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h4"><b>Information</b>
                    <Button variant="primary" onClick={handleShow} style={{ float:"right" , margin: "10px"}}>
        Edit Profile
      </Button>
                    </MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{user?.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Age</MDBTypography>
                        <MDBCardText className="text-muted">{user?.age}</MDBCardText>
                      </MDBCol>
                    </MDBRow><br/>

                    <MDBTypography tag="h4"><b>Employee Status</b></MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Inital Approval</MDBTypography>
                        <MDBCardText className="text-muted">
                          {/* if user?.is_approved then show as Approved else Rejected */}
                          {user?.is_approved ? "Approved" : "Pending"}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">On BlackList</MDBTypography>
                        <MDBCardText className="text-muted">{user?.is_rejected ? "BlackListed" : "Not BlackListed"}</MDBCardText>
                      </MDBCol><br/><br/>

                      {/* Slot alloted deatils */}
                      <MDBTypography tag="h4"><b>Slot Details</b></MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        {/* make div red id slot is not allowed */}
                        <MDBCol size="12" className="mb-3" style={{ textAlign:"center"}}>
                          <MDBCardText tag="h4" className="text-muted">{booked ? "Slot Allotted" : "Slot Not Allotted"}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <br/>
                      <MDBCol size="6" className="mb-3" style={{ textAlign:"center"}}>
                        <MDBTypography tag="h4">Row </MDBTypography>
                        <MDBCardText tag="h4" className="text-muted"><b>{slot_row}</b></MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3" style={{ textAlign:"center"}}>
                        <MDBTypography tag="h4">Column</MDBTypography>
                        <MDBCardText tag="h4" className="text-muted"><b>{slot_number}</b></MDBCardText>
                      </MDBCol>
                      <hr className="mt-0 mb-4" />
                      <br/><br/>
                      

                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* form to edit user data  */}
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th style={{ fontWeight: "bolder" }}>Employee Full Name</th>
            <td>
              <input
                value={name}
                name="name"
                onChange={changeHandler}
                type="text"
                className="form-control"
              />
            </td>
          </tr>
          <tr>
            <th style={{ fontWeight: "bolder" }}>Employee Age</th>
            <td>
              <input
                value={age}
                name="age"
                onChange={changeHandler}
                type="text"
                className="form-control"
              />
            </td>
          </tr>
          <tr>
            <th style={{ fontWeight: "bolder" }}>Employee Email</th>
            <td>
              <input
                value={email}
                name="email"
                onChange={changeHandler}
                type="text"
                className="form-control"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th style={{ fontWeight: "bolder" }}>Employee Designation</th>
            <td>
              <input
                value={designation}
                name="designation"
                onChange={changeHandler}
                type="text"
                className="form-control"
              />
            </td>
          </tr>
          {/* profile_pic */}
          <tr>
            <th style={{ fontWeight: "bolder" }}>Employee Profile Picture</th>
            <td>
              <input
                value={profile_pic}
                name="profile_pic"
                onChange={onChangeFileUpload}
                type="file"
                className="form-control"
              />
              <label className="custom-file-label" htmlFor="customFile">
                    {filename}
                    </label>
            </td>
            
          </tr>
          
        </tbody>
      </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
    

  );
}