// rejected list 

import React, { useState, useEffect } from "react";
import Axios from "axios";
import Loderfun from "../components/Loader";

function RejctedList () {
    const [data, setData] = useState([]);

    // use state for loader 
    const [loader, setLoader] = useState(false);

     // check if user is logined in
     const checkLogin = () => {
        const token = localStorage.getItem("token");
        if (token === null) {
            window.location.href = "/login";
        }
    };

    // Fetch Data from django api
    useEffect(() => {
        setLoader(true);
      checkLogin( )
      Axios.get("https://emp-api.jassy.in/rejectedList/").then((response) =>
        setData(response.data)
      ).then(() => {
        setLoader(false);
        });
    }
    , []);

    // SHOW LIST
    return(
        <>
            <h1 className="text-center text-danger p-4">Rejected Employee List</h1>
            {/* loader here if Loder state is true*/}
      {loader ? 
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
      <Loderfun />
      </div> : 
    //   if loader is false then show the list
            <table className="table table-bordered ">
                <thead>
                    <tr >
                        <th style={{ fontWeight: 'bolder' }}>Sl no</th>
                        <th style={{ fontWeight: 'bolder' }}>Profile Dp</th>
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
                    <td><img src={"https://emp-api.jassy.in"+item.profile_pic} alt="profile pic" style={{width: "50px", height: "50px", borderRadius: "50%"}}/></td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.email}</td>
                    <td>{item.designation}</td>
                 
                </tr>
                
            </tbody>
            ))}
        </table>
        }   
        </>

    );
}

export default RejctedList;