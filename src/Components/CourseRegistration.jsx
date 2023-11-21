import React, { useState, useEffect } from "react";

const CourseRegistration = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [registeredCourse, setRegisteredCourse] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [disableRegistration, setDisableRegistration] = useState(false);

  useEffect(() => {
    // Load registered course from local storage
    const storedCourse = localStorage.getItem("registeredCourse") || "";
    if (storedCourse) {
      setRegisteredCourse(storedCourse);
      setRegistrationMessage(
        `You have already registered for ${storedCourse}.`
      );
      setDisableRegistration(true);
    }
  }, []);

  const handleRegistration = () => {
    if (!selectedCourse) {
      alert("Please select a course.");
      return;
    }

    if (!disableRegistration) {
      // Register the course
      setRegisteredCourse(selectedCourse);
      setRegistrationMessage(
        `You have successfully registered for ${selectedCourse}.`
      );
      setDisableRegistration(true);

      // Save to local storage
      localStorage.setItem("registeredCourse", selectedCourse);
    } else {
      alert("You have already registered for a course.");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2>Course Registration</h2>
        {registrationMessage && (
          <p className="text-success">{registrationMessage}</p>
        )}
        <div className="form-group">
          <label>Select Course:</label>
          <select
            className="form-control"
            value={selectedCourse}
            onChange={(event) => setSelectedCourse(event.target.value)}
            disabled={disableRegistration}
          >
            <option value="" disabled={disableRegistration}>
              {disableRegistration ? "Registration Closed" : "Select"}
            </option>
            <option value="FSC Pre Medical">FSC Pre Medical</option>
            <option value="FSC Pre Engineering">FSC Pre Engineering</option>
            <option value="ICom">ICom</option>
          </select>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleRegistration}
          disabled={disableRegistration}
        >
          Register
        </button>
      </div>
    </>
  );
};

export default CourseRegistration;
