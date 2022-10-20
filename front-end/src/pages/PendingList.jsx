import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";




function PendingList () {
    const [data, setData] = useState([]);

    // check if user is logined in
    const checkLogin = () => {
        const token = localStorage.getItem("token");
        if (token === null) {
            window.location.href = "/login";
        }
        // check the token is valid or not
        else {
            Axios.post("http://127.0.0.1:8000/UserLogin/", {
                token: token,
            }).then((response) => {
                if (response.data.message) {
                    window.location.href = "/login";
                }
                else {
                    console.log("token is valid");
                }
            });
        }

    };


    // Fetch Data from django api
    useEffect(() => {
      checkLogin( )
      Axios.get("http://127.0.0.1:8000/pending/").then((response) =>
        setData(response.data)
      );
    }, []);

    //Giving approval for an employee
    const approveEmployee = (id) => {
     Axios.post("http://127.0.0.1:8000/approveEmployee/",{
         id: id,
     });
     Swal.fire("Approved!", "", "success");
     // update the page using state
     setData(data.filter((item) => item.id !== id));
    };

    // Reject employee
    const rejectEmployee = (id) => {
        Axios.post("http://127.0.0.1:8000/rejectEmployee/",{
            id: id,
        });
        Swal.fire("Rejected!", "", "success");
        // update the page using state
        setData(data.filter((item) => item.id !== id));
    };
            


    


    // Delete Employee
    const deleteEmployee = (id) => {
        // swal pop up to confrm delete
        Swal.fire({
            title: "Are you sure ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete("http://127.0.0.1:8000/employee/delete/"+id);

                // if post request is successfull update setData
                setData(data.filter((item) => item.id !== id));

                Swal.fire("Deleted!", "", "success");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "", "error");
            }
        });
    };

    return(
        <>
         <h1 className="text-center text-danger p-4">Pending Employee List</h1>
         <table className="table table-bordered ">
            <thead>
                <tr >
                    <th style={{ fontWeight: 'bolder' }}>Sl no</th>
                    <th style={{ fontWeight: 'bolder' }}>Name</th>
                    <th style={{ fontWeight: 'bolder' }}>Age</th>
                    <th style={{ fontWeight: 'bolder' }}>Email</th>
                    <th style={{ fontWeight: 'bolder' }}>Designation</th>
                    {localStorage.getItem("admin") ? (
                        <th style={{ fontWeight: "bolder" }}>Action</th>
                    ) : null}
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
                    {localStorage.getItem("admin") ? (
                    <td>
                      <button
                        className="btn btn-success mx-2"
                        onClick={() => approveEmployee(item.id)}
                      >
                        Approval Employee
                      </button>
                      <button
                        className="btn btn-info mx-2"
                        onClick={() => rejectEmployee(item.id)}
                      >
                        Reject Employee
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => deleteEmployee(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  ) : null} 
                 
                </tr>
                
            </tbody>
            ))}
        </table>
        </>

    );
}

export default PendingList;