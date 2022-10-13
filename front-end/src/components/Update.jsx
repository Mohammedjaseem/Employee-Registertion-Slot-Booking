import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

let id;

function Update(props) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");

  const currentURL = window.location.href;
  id = currentURL.split("/")[4];

  // Fetch Data from django api
  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/employee/" + id).then((response) =>
      setData(response.data)
    );
  }, []);

  // Update Employee
  const updateEmployee = (id) => {
    Axios.put("http://127.0.0.1:8000/employee/" + id, {
      name: name,
      age: age,
      email: email,
      designation: designation,
    });
    Swal.fire("Updated!", "", "success");
    window.location.reload();
  };

  return (
    <>
      <h1 className="text-left text-danger">Update Employee</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={data.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                defaultValue={data.age}
                // value={data.age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                value={data.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Designation"
                value={data.designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <button
                className="btn btn-primary"
                onClick={() => updateEmployee(data.id)}
              >
                Update
              </button>
              <Link className="btn btn-danger mx-2" to="/">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Update;
