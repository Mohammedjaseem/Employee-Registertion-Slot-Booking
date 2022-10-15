

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

let id 

function Update (props) {
    const [data, setData] = useState([]);
    const [name, setName] = useState(data.name);
    const [age, setAge] = useState(data.age);
    const [email, setEmail] = useState(data.email);
    const [designation, setDesignation] = useState(data.designation);
    const [is_approved, setIs_approved] = useState(data.is_approved);
    const [is_rejected, setIs_rejected] = useState(data.is_rejected);

    const currentURL = window.location.href
    id = currentURL.split("/")[4]

    // Fetch Data from django api
    useEffect(() => {
      Axios.get("http://127.0.0.1:8000/employee/"+id).then((response) =>
        setData(response.data)
      );
    }
    , []);



    // Update Employee
    const updateEmployee = (id) => {
        console.log(name, age, email, designation)
        if (name === undefined || age === undefined || email === undefined || designation === undefined || is_approved === undefined || is_rejected === undefined) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "All fields are required!",
            });
        } 
        else {
        Axios.put("http://127.0.0.1:8000/employee/"+id, {
            name: name,
            age: age,
            email: email,
            designation: designation,
            is_approved: is_approved,
            is_rejected: is_rejected
        });
        Swal.fire("Updated!", "", "success");
        console.log()
        window.location.href = "/list";
    }};

    return(
        <>
            <h1 className="text-left text-danger">Update Employee</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Enter Name" defaultValue={data.name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input type="text" className="form-control" placeholder="Enter Age" defaultValue={data.age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Enter Email" defaultValue={data.email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <input type="text" className="form-control" placeholder="Enter Designation" defaultValue={data.designation} onChange={(e) => setDesignation(e.target.value)} />
                        </div>
                        {/* drop down to select true or flase for is active */}
                        <div className="form-group">
                            <label>Approve or pending Employee </label>
                            <select className="form-control" style={{ maxWidth: 150}} defaultValue={data.is_approved} onChange={(e) => setIs_approved(e.target.value)}>
                                <option value="" selected disabled hidden>Choose here ⬇️</option>
                                <option value="true">Approve Employee</option>
                                <option value="false">Peding Descion</option>
                            </select>
                        </div>

                        {/* Drop down to reject employee true or flase*/}
                        <div className="form-group">
                            <label>Reject Employee </label>
                            <select className="form-control" style={{ maxWidth: 150}} defaultValue={data.is_rejected} onChange={(e) => setIs_rejected(e.target.value)}>
                                <option value="" selected disabled hidden>Choose here ⬇️</option>
                                <option value="true">Reject Employee</option>
                                <option value="false">Dont Reject Employe</option>
                            </select>
                        </div>
            
                        
                        <div className="form-group my-3">
                            
                        <button className="btn btn-primary" onClick={() => updateEmployee(id)}>Update</button>
                        <Link to="/list" className="btn btn-danger">Cancel</Link>
                        </div>
                  
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Update;

// need some updates in the code