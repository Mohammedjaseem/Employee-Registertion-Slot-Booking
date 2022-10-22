//  USer login page
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Loderfun from "../components/Loader";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [email_for_fetch_details, setEmailForFeatchDetails] = useState("");

    // use state for loader 
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();

    const login = () => {
        setLoader(true);
        Axios.post("https://emp-api.jassy.in/UserLogin/", {
            email: email,
            password: password,
        }).then((response) => {
            setLoader(false);
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
                        localStorage.setItem("token", response.data.refresh);
                        localStorage.setItem("email_for_fetch_details", email);
                        // test jwt
                        localStorage.setItem("refresh_token", response.data.refresh);
                        localStorage.setItem("access_token", response.data.access);
                        // navigate to homepage if user is logined with user email as a parameter
                        
                        navigate('/')
                    }
                });
            }
        })
        .catch((error) => {
            setLoader(false);
        console.log('this is error',error);
        // if confirmButton is clicked then navigate to login page
        Swal.fire({
            title: "Account not found",
            text: error.response.data.detail,
            icon: "warning",
            confirmButtonText: "Retry",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login')
            }
        });
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
                        {/* loader here if Loder state is true*/}
                        {loader ? 
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
                        <Loderfun />
                        </div> : 
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
                            <br></br>
                            <div className="form-group">
                                <button
                                    className="btn btn-primary"
                                    onClick={login}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="form-group">
                                <p><br></br>
                                    <Link to="/register">Register New User</Link><br/>
                                    <Link to="/admin">Admin Login</Link>
                                </p>

                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default LoginPage;   