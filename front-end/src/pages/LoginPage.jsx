//  USer login page
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        Axios.post("http://127.0.0.1:8000/UserLogin/", {
            email: email,
            password: password,
        }).then((response) => {
            console.log(response);
            if (response.data.message) {
                Swal.fire({
                    title: "Error",
                    text: response.data.message,
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            } else {
                Swal.fire({
                    title: "Success",
                    text: "You are logged in successfully",
                    icon: "success",
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        // set a token in local storage
                        localStorage.setItem("token", response.data.token);
                        window.location.href = "/";
                    }
                });
            }
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card mt-5">
                        <div className="card-header">
                            <h3 className="text-center">User Login</h3>
                        </div>
                        <div className="card-body">
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
                                    className="btn btn-primary"
                                    onClick={login}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="form-group">
                                <Link to="/register">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default LoginPage;   