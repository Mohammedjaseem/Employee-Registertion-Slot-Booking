import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loderfun from "../components/Loader";

function PendingList() {
  const [data, setData] = useState([]);
  const [slotsbookedby, setSlotsbookedby] = useState([]);
  const navigate = useNavigate();

  // useState for Search employee
  const [q, setQ] = useState("");

  // use state for loader
  const [loader, setLoader] = useState(false);

  // check if user is logined in
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token === null) {
      window.location.href = "/admin";
    }
  };

  // filter employee with state search
  const searchEmployee = () => {
    setLoader(true);
    // if search is empty then show all employee
    if (q === "") {
      Axios.get("https://emp-api.jassy.in/allEmployeeList/")
      .then((response) => setData(response.data))
    } 
    // search employee with name or email within the frontend its
    Axios.get('http://127.0.0.1:8000/searchEmployee/', {
      params: {
        search: q,
      },
    })
    // update state data with response data
      .then((response) => {
        setData(response.data);
        // refresh page data
        setLoader(false);  
        // if no employee found
        if (response.data.length === 0) {
          setLoader(false); 
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };


  // Fetch Data from django api
  useEffect(() => {
    setLoader(true);
    checkLogin();
    Axios.get("https://emp-api.jassy.in/allEmployeeList/")
      .then((response) => setData(response.data))
      .then(() => {
        setLoader(false);
      });
  }, []);

  // fetch booked_by data from Slot api
  useEffect(() => {
    Axios.get("https://emp-api.jassy.in/slotBookingDetails/").then((response) =>
      setSlotsbookedby(response.data)
    );
  }, []);

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
        Axios.delete("https://emp-api.jassy.in/employee/delete/" + id);
        Swal.fire("Deleted!", "", "success");
        // update the page using state
        setData(data.filter((item) => item.id !== id));

        // native way to update the page
        navigate("/AdminPage");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "", "error");
      }
    });
  };

  return (
    <>
      <h1 className="text-center text-danger p-4">All Employes</h1>
      {/* Search box onchange*/}
      <div className="container">
        <div className="row  justify-content-center">
          <div className="col-md-4" style={{ textAlign: "center" }}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by employee name"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={q}
                // on change set state search and call searchEmployee function
                onChange={(e) => {
                  setQ(e.target.value)
                  searchEmployee()
                }}
                // display search keyword 
                // value={search}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Search box ends here */}
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
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th style={{ fontWeight: "bolder" }}>Sl no</th>
              <th style={{ fontWeight: "bolder" }}>profile Picture</th>
              <th style={{ fontWeight: "bolder" }}>Name</th>
              <th style={{ fontWeight: "bolder" }}>Age</th>
              <th style={{ fontWeight: "bolder" }}>Email</th>
              <th style={{ fontWeight: "bolder" }}>Designation</th>
              <th style={{ fontWeight: "bolder" }}>Approval Status</th>
              <th style={{ fontWeight: "bolder" }}>Rejected Employee</th>
              <th style={{ fontWeight: "bolder" }}>Slot Approved</th>
              <th style={{ fontWeight: "bolder" }}>Actions</th>
            </tr>
          </thead>

          {data.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>{item.id}</td>
                <td>
                  <img
                    src={"https://emp-api.jassy.in" + item.profile_pic}
                    height="50px"
                    style={{ borderRadius: "50%" }}
                    alt="profile"
                    width="50px"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
                <td>{item.designation}</td>
                {/* if item.is_approved is true then Employee Approved in green bage else Employee Not Approved in red badge*/}
                {item.is_approved ? (
                  <td>
                    <span
                      className="badge bg-success"
                      style={{ fontSize: "12px" }}
                    >
                      Approved
                    </span>
                  </td>
                ) : (
                  <td>
                    <span
                      className="badge bg-danger"
                      style={{ fontSize: "12px" }}
                    >
                      Not Approved
                    </span>
                  </td>
                )}
                {/* if item.is_rejected is true then Rejected Employee in red badge else On List Employee*/}
                {item.is_rejected ? (
                  <td>
                    <span
                      className="badge bg-danger"
                      style={{ fontSize: "12px" }}
                    >
                      Rejected
                    </span>
                  </td>
                ) : (
                  <td>
                    <span
                      className="badge bg-success"
                      style={{ fontSize: "12px" }}
                    >
                      On List
                    </span>
                  </td>
                )}
                {/* if employee have any slot booked in setSlotsbookedby then show slot_row and slot_number else display as no slot allocated*/}
                {slotsbookedby.map(
                  (slot) =>
                    // check if the employee name is equal to slot.is_booked then show slot_row and slot_number
                    item.name === slot.booked_by ? (
                      <ul>
                        {slot.booked_by === item.name && slot.is_booked ? (
                          // if slot.is_booked is true then show slot_row and slot_number else brak the loop
                          // only show if slot is booked by employee else skip
                          <p className="badge bg-info">
                            Slot Row: {slot.slot_row} <br /> Slot Number:{" "}
                            {slot.slot_number}
                          </p>
                        ) : null}
                        {/* if p tag got null value delete that tag */}
                      </ul>
                    ) : (
                      <tr></tr>
                    )

                  // if null just add a table row
                )}

                {/* if user has no slot show as blank slot */}
                <td>
                  <Link to={"../update/" + item.id}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pen"
                      viewBox="0 0 16 16"
                    >
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                  </Link>
                  {/* delete emp button */}
                  <a className="p-2" onClick={() => deleteEmployee(item.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                  </a>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </>
  );
}

export default PendingList;
