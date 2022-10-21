// react function to add dp

import React, { useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function AddDp() {
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("Choose File");
    const [uploadedFile, setUploadedFile] = useState({});
    
    
    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("img", file);
        try {
        const res = await Axios.post("https://emp-api.jassy.in/imgUpload/", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        });
        const { fileName, filePath } = res.data;
        setUploadedFile({ fileName, filePath });
        Swal.fire({
            title: "Success",
            text: "Image Uploaded",
            icon: "success",
            confirmButtonText: "Ok",
        });
        } catch (err) {
        if (err.response.status === 500) {
            console.log("There was a problem with the server");
        } else {
            console.log(err.response.data.msg);
        }
        }
    };

    return (
        <div className="container">
        <div className="row">
            <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">Upload Image</h2>
                <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                    {filename}
                    </label>
                </div>
                <input
                    type="submit"
                    value="Upload"
                    className="btn btn-primary btn-block mt-4"
                />
                </form>
            </div>
            </div>
        </div>
        </div>
    );
}

export default AddDp;