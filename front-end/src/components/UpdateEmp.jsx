// funcational component to update employee details

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';



function Update (props) {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const navigate = useNavigate();

    // Fetch Data from django api
    useEffect(() => {
      const id = props.match.params.id;
      Axios.get("https://emp-api.jassy.in/employee/"+id).then((response) =>
        setData(response.data)
      );
    }
    , []);

    // Update Employee
    const updateEmployee = (id) => {
        Axios.put("https://emp-api.jassy.in/employee/"+id, {
            name: name,
            age: age,
            email: email,
            designation: designation
        });
        Swal.fire("Updated!", "", "success");
        navigate("/list");
    };

    return(
        <>
            <h1 className="text-center text-danger p-4">Update Employee</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Enter Name" value={data.name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input type="text" className="form-control" placeholder="Enter Age" value={data.age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Enter Email" value={data.email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <input type="text" className="form-control" placeholder="Enter Designation" value={data.designation} onChange={(e) => setDesignation(e.target.value)} />
                        </div>
                        <button className="btn btn-primary" onClick={() => updateEmployee(data.id)}>Update</button>
                        <Link className="btn btn-danger mx-2" to="/">Cancel</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
