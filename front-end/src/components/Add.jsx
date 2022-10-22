

import React, { useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import Loderfun from "../components/Loader";

function Add() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("reg_mail"));
  const [designation, setDesignation] = useState("");
  const [profile_pic, setProfile_pic] = useState(null);

  // img file handles
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  // use state for loader
  const [loader, setLoader] = useState(false);

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
    setLoader(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("email", email);
    formData.append("designation", designation);
    formData.append("profile_pic", file);

    try {
      const res = await Axios.post("https://emp-api.jassy.in/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setLoader(false);  
      Swal.fire({
        title: "Success",
        text: "Employee Added Successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      // after ok button clicked redirect to login page after 2 seconds
      setTimeout(() => {
      window.location.href = "/login";
      }, 2000);
      
    } catch (err) {
      setLoader(false);  
      if (err.response.status === 500) {
        // swal alert 
        Swal.fire({
          title: "Error",
          text: "There was a problem with the server",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }  
  };

  return (
    <>
      <h1 className="text-center text-danger p-4">Register Employee</h1>
      {/* loader here if Loder state is true*/}
      {loader ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Loderfun />
        </div>
      ) : (
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
          <tr>
            <td colSpan="2">
              <input
                type="submit"
                onClick={submitForm}
                className="btn btn-dark"
              />
            </td>
          </tr>
        </tbody>
      </table>
      )}
    </>
  );
}

export default Add;
