import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";




function PendingList () {
    const [data, setData] = useState([]);

    // Fetch Data from django api
    useEffect(() => {
        checkLogin( )
      Axios.get("http://127.0.0.1:8000/pending/").then((response) =>
        setData(response.data)
      );
    }, []);
    

    // check if user is logined in
    const checkLogin = () => {
        const token = localStorage.getItem("token");
        if (token === null) {
            window.location.href = "/login";
        }
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
                window.location.reload();
                Swal.fire("Deleted!", "", "success");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "", "error");
            }
        });
    };

    return(
        <>
         <h1 className="text-left text-danger">All Employes</h1>
         <table className="table table-bordered ">
            <thead>
                <tr >
                    <th style={{ fontWeight: 'bolder' }}>Sl no</th>
                    <th style={{ fontWeight: 'bolder' }}>Name</th>
                    <th style={{ fontWeight: 'bolder' }}>Age</th>
                    <th style={{ fontWeight: 'bolder' }}>Email</th>
                    <th style={{ fontWeight: 'bolder' }}>Designation</th>
                    <th style={{ fontWeight: 'bolder' }}>Actions</th>
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
                    <td >
                        <Link className='btn btn-dark mx-2' to={'../update/'+ item.id}>Update Data</Link>
                        {/* delete emp button */}
                        <button className='btn btn-danger' onClick={() => deleteEmployee(item.id)}>Delete</button>
                    </td>
                </tr>
                
            </tbody>
            ))}
        </table>
        </>

    );
}
export default PendingList;