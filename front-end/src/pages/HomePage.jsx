import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BootstrapCards from '../components/BootstrapCards';
import Axios from "axios";
import { useEffect, useState } from "react";


const HomePage = () => {

  // import approved employes data 
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/").then((response) =>
      setData(response.data)
    );
  }, []);


  return (
    <>
      <h1>Home Page</h1>
      <p>
        {/* map data */}
        {data.map((val) => {
          return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <BootstrapCards name={val.name} age={val.age} email={val.email} designation={val.designation} dp={val.profile_pic}/>
            </div>
          );
        })}

      </p>
    </>


  )
}

export default HomePage