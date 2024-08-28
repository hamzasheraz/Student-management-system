import React, { useState } from "react";
import axios from "axios";

const StudentProfileEdit = () => {
  const [name, setName] = useState(""); // State for the name field
  const [password, setPassword] = useState(""); // State for the password field
  const rollNo = localStorage.getItem("rollnumber");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const handleSave = () => {
    // Implement save logic here, e.g., make an API call to save the changes
    if (name && password) {
      axios
        .post("http://127.0.0.1:8000/api/student-edit/", {
          name,
          password,
          rollNo,
        })
        .then((response) => {
          if (response.data) {
            setSaveSuccess(true);
            setSaveError(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setSaveSuccess(false);
          setSaveError(true);
        });
    } else {
      setSaveSuccess(false);
      setSaveError(true);
    }
  };

  return (
    <div className="container bootstrap snippets bootdey">
      <h1 className="text-primary">Edit Profile</h1>
      <hr />

      {/* Name Field */}
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Password Field */}
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Save Button */}
      <button className="btn btn-primary" onClick={handleSave}>
        Save Changes
      </button>

      {/* Display success message */}
      {saveSuccess && <p className="text-success">Successfully Saved!</p>}

      {/* Display error message */}
      {saveError && <p className="text-danger">Error occurred. Try again.</p>}
    </div>
  );
};

export default StudentProfileEdit;
