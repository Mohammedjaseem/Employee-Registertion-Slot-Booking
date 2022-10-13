import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";




function List () {
    const [data, setData] = useState([]);

    // Fetch Data from django api
    useEffect(() => {
      Axios.get("http://127.0.0.1:8000/").then((response) =>
        setData(response.data)
      );
    }, []);

    // Delete Employee
    const deleteEmployee = (id) => {
        Axios.delete("http://127.0.0.1:8000/employee/delete/"+id);
        window.location.reload();
    };

    return(
        <>
         <h1 className="text-left text-danger">Employee List</h1>
         <table className="table table-bordered ">
            <thead>
                <tr>
                    <th>Sl no</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Actions</th>
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
                        <Link className='btn btn-dark mx-2' to={'update/'+ item.id}>Update</Link>
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
export default List;