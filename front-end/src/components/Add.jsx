import React from "react";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";

// CommonJS

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      age: "",
      email: "",
      designation: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  // Input Change Handler
  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // Submit Form
  submitForm() {
    Swal.fire({
      title: "Do you want to add " + this.state.name + " as your employe ?",
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
          body: JSON.stringify(this.state),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          // go back to home page code here
          .then((response) => response.json())
          .then((data) => console.log(data));

       
        this.setState({
          full_name: "",
          email: "",
          contact: "",
          address: "",
        });

         //   reload page after a dealy
         setTimeout(function () {
            window.location.reload();
        }, 2000);

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  render() {
    return (
      <>
        <h1 className="text-left text-danger">Register Employee</h1>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Employee Full Name</th>
              <td>
                <input
                  value={this.state.name}
                  name="name"
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <th>Employee Age</th>
              <td>
                <input
                  value={this.state.age}
                  name="age"
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <th>Employee Email</th>
              <td>
                <input
                  value={this.state.email}
                  name="email"
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <th>Employee Designation</th>
              <td>
                <input
                  value={this.state.designation}
                  name="designation"
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <input
                  type="submit"
                  onClick={this.submitForm}
                  className="btn btn-dark"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default Add;
