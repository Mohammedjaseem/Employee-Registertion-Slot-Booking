//  USer Registration Page
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    
    const register = () => {
        Axios.post("http://127.0.0.1:8000/UserRegister/", {
            username: username,
            email: email,
            password: password,
        }).then((response) => {
            localStorage.setItem("reg_mail", email);
            Swal.fire({
                title: "Success",
                text: "Please update your Details",
                icon: "success",
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    // navigate to add employee page after registration qith props of user email using navigate
                    navigate('/add', {email})
                }
            });
        }).catch((error) => {
            console.log('this is error',error.response.data.email);
            Swal.fire({
                title: "Error",
                text: error.response.data.email,
                icon: "error",
                confirmButtonText: "Ok",
            });
        });
    };



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card mt-5">
                        <div className="card-header">
                            <h3 className="text-center">User Registration</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Username"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password" 
                                    className="form-control"
                                    placeholder="Enter Password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={register}
                                >
                                    Register
                                </button>
                            </div>
                            <div className="form-group">
                                <Link to="/login">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
