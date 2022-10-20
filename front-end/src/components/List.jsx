import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function List() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // check if user is logined in
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("admin");
    if (token === null) {
      window.location.href = "/login";
    }
  };

  // Fetch Data from django api
  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/").then((response) =>
      setData(response.data)
    );
  }, []);



  // Canacel Approvel of employee
  const cancelApprovel = (id) => {
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
        Axios.post("http://127.0.0.1:8000/cancelEmployee/", {
          id: id,
        });

        // if post request is successfull update setData
        setData(data.filter((item) => item.id !== id));
    
        Swal.fire("Deleted!", "", "success");
        navigate("/list");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "", "error");
      }
    });
  };

  // Delete Employee
  const deleteEmployee = (id) => {
    checkLogin();
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
        Axios.delete("http://127.0.0.1:8000/employee/delete/" + id);
        window.location.reload();
        Swal.fire("Deleted!", "", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "", "error");
      }
    });
  };

  return (
    <>
      <h1 className="text-left text-danger">Approved Employee List</h1>
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th style={{ fontWeight: "bolder" }}>Sl no</th>
            <th style={{ fontWeight: "bolder" }}>Photo</th>
            <th style={{ fontWeight: "bolder" }}>Name</th>
            <th style={{ fontWeight: "bolder" }}>Age</th>
            <th style={{ fontWeight: "bolder" }}>Email</th>
            <th style={{ fontWeight: "bolder" }}>Designation</th>

            {localStorage.getItem("admin") ? (
              <th style={{ fontWeight: "bolder" }}>Action</th>
            ) : null}

            {/* <th style={{ fontWeight: 'bolder' }}>Actions</th> */}
          </tr>
        </thead>

        {data.map(
          (item) => (
            (item.dp = "http://127.0.0.1:8000/" + item.profile_pic),
            (
              <tbody key={item.id}>
                <tr>
                  <td>{item.id}</td>
                  <td>
                    <img
                      src={item.dp}
                      alt="photo"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.email}</td>
                  <td>{item.designation}</td>

                  {localStorage.getItem("admin") ? (
                    <td>
                      <button
                        className="btn btn-dark mx-2"
                        onClick={() => cancelApprovel(item.id)}
                      >
                        Canel Approval
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
            )
          )
        )}
      </table>
    </>
  );
}

export default List;
