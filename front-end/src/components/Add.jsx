// import React from "react";
// // ES6 Modules or TypeScript
// import Swal from "sweetalert2";


// // CommonJS

// class Add extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "",
//       age: "",
//       email: "",
//       designation: "",
//       // profile_pic is a file 
//       profile_pic: null,
//     };
//     this.changeHandler = this.changeHandler.bind(this);
//     this.submitForm = this.submitForm.bind(this);
//   }

  

//   // Input Change Handler
//   changeHandler(event) {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   }

//   // img upload handler
//   imgUploadHandler = (e) => {
//     this.setState({
//       profile_pic: e.target.files[0],
//     });
//   };

//   // Submit Form
//   submitForm() {
//     Swal.fire({
//       title: "Do you want to add " + this.state.name + " as your employe ?",
//       showDenyButton: true,
//       showCancelButton: true,
//       confirmButtonText: "Save Employee",
//       denyButtonText: `Don't save Employee`,
//     }).then((result) => {
//       /* Read more about isConfirmed, isDenied below */
//       if (result.isConfirmed) {
//         Swal.fire("Saved!", "", "success");
//         fetch("http://127.0.0.1:8000/", {
//           method: "POST",
//           body: JSON.stringify(this.state),
//           headers: {
//             "Content-type": "application/json; charset=UTF-8",
//           },
//         })
//           // go back to home page code here
//           .then((response) => response.json())
//           .then((data) => console.log(data));

       
//         this.setState({
//           full_name: "",
//           email: "",
//           contact: "",
//           address: "",
//           profile_pic: "",
//         });

//          //   reload page after a dealy
//          setTimeout(function () {
//             // redirect to home page
//             window.location.href = "/login";
//         }, 2000);

//       } else if (result.isDenied) {
//         Swal.fire("Changes are not saved", "", "info");
//       }
//     });
//   }

//   render() {
    
//     return (
//       <>
//         <h1 className="text-left text-danger">Register Employee</h1>
//         <table className="table table-bordered">
//           <tbody>
//             <tr>
//               <th style={{ fontWeight: 'bolder' }}>Employee Full Name</th>
//               <td>
//                 <input
//                   value={this.state.name}
//                   name="name"
//                   onChange={this.changeHandler}
//                   type="text"
//                   className="form-control"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <th style={{ fontWeight: 'bolder' }}>Employee Age</th>
//               <td>
//                 <input
//                   value={this.state.age}
//                   name="age"
//                   onChange={this.changeHandler}
//                   type="text"
//                   className="form-control"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <th style={{ fontWeight: 'bolder' }}>Employee Email</th>
//               <td>
//                 <input
//                   value={this.state.email}
//                   name="email"
//                   onChange={this.changeHandler}
//                   type="text"
//                   className="form-control"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <th style={{ fontWeight: 'bolder' }}>Employee Designation</th>
//               <td>
//                 <input
//                   value={this.state.designation}
//                   name="designation"
//                   onChange={this.changeHandler}
//                   type="text"
//                   className="form-control"
//                 />
//               </td>
//             </tr>
//             {/* profile_pic */}
//             <tr>
//               <th style={{ fontWeight: 'bolder' }}>Employee Profile Picture</th>
//               <td>
//                 <input
//                   value={this.state.profile_pic}
//                   name="profile_pic"
//                   onChange={this.imgUploadHandler}
//                   type="file"
//                   className="form-control"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td colSpan="2">
//                 <input
//                   type="submit"
//                   onClick={this.submitForm}
//                   className="btn btn-dark"
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </>
//     );
//   }
// }

// export default Add;

// react function to add employee deatiles with picture

import React, { useState } from "react";
import Swal from "sweetalert2";

function Add() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [profile_pic, setProfile_pic] = useState(null);

  // Input Change Handler
  const changeHandler = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "age") {
      setAge(event.target.value);
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "designation") {
      setDesignation(event.target.value);
    }
  };

  // img upload handler
  const imgUploadHandler = (e) => {
    setProfile_pic(e.target.files[0]);
  };

  // Submit Form
  const submitForm = () => {
    Swal.fire({
      title: "Do you want to add " + name + " as your employe ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save Employee",
      denyButtonText: `Don't save Employee`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        fetch("http://127.0.0.1:8000/", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            age: age,
            email: email,
            designation: designation,
            profile_pic: profile_pic,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          // go back to home page code here
          .then((response) => response.json())
          .then((data) => console.log(data));

        setName("");
        setAge("");
        setEmail("");
        setDesignation("");
        setProfile_pic(null);

        //   reload page after a dealy
        setTimeout(function () {
          // redirect to home page
          window.location.href = "/login";
        }, 2000);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    // console.log(name, age, email, designation, profile_pic);
  };

  return (
    <>
      <h1 className="text-left text-danger">Register Employee</h1>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th style={{ fontWeight: "bolder" }}>Employee Full Name</th>
            <td>
              <input
                value={name}
                name="name"
                onChange={changeHandler}
                type="text"
                className="form-control"
              />
            </td>
          </tr>
          <tr>
            <th style={{ fontWeight: "bolder" }}>Employee Age</th>
            <td>
              <input
                value={age}
                name="age"
                onChange={changeHandler}
                type="text"
                className="form-control"
              />
            </td>
          </tr>
          <tr>
            <th style={{ fontWeight: "bolder" }}>Employee Email</th>
            <td>
              <input
                value={email}
                name="email"
                onChange={changeHandler}
                type="text"
                className="form-control"
              />
            </td>
          </tr>
          <tr>
            <th style={{ fontWeight: "bolder" }}>Employee Designation</th>
            <td>
              <input
                value={designation}
                name="designation"
                onChange={changeHandler}
                type="text"
                className="form-control"
              />
            </td>
          </tr>
          {/* profile_pic */}
          <tr>
            <th style={{ fontWeight: "bolder" }}>Employee Profile Picture</th>
            <td>
              <input
                
                name="profile_pic"
                onChange={imgUploadHandler}
                type="file"
                className="form-control"
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <input
                type="submit"
                onClick={submitForm}
                className="btn btn-dark"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Add;
