// rejected list 

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

function RejctedList () {
    const [data, setData] = useState([]);

     // check if user is logined in
     const checkLogin = () => {
        const token = localStorage.getItem("token");
        if (token === null) {
            window.location.href = "/login";
        }
    };

    // Fetch Data from django api
    useEffect(() => {
      checkLogin( )
      Axios.get("http://127.0.0.1:8000/rejectedList/").then((response) =>
        setData(response.data)
      );
    }
    , []);

    // SHOW LIST
    return(
        <>
            <h1 className="text-left text-danger">Rejected Employee List</h1>
            <table className="table table-bordered ">
                <thead>
                    <tr >
                        <th style={{ fontWeight: 'bolder' }}>Sl no</th>
                        <th style={{ fontWeight: 'bolder' }}>Name</th>
                        <th style={{ fontWeight: 'bolder' }}>Age</th>
                        <th style={{ fontWeight: 'bolder' }}>Email</th>
                        <th style={{ fontWeight: 'bolder' }}>Designation</th>

                    </tr>
                </thead>

                {data.map((item) => (
            <tbody key={item.id}>
                
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.email}</td>
                    <td>{item.designation}</td>
                 
                </tr>
                
            </tbody>
            ))}
        </table>
        </>

    );
}

export default RejctedList;