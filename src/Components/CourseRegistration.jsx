import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseRegistration = () => {
  let apiKey = process.env.REACT_APP_API_KEY;
  const [selectedCourse, setSelectedCourse] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [disableRegistration, setDisableRegistration] = useState(false);
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem("accessToken");

  // Set the default authorization header for all axios requests
  axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
  useEffect(() => {
    // Fetch courses from the backend
    const fetchData = async () => {
      try {
        // Fetch student data
        const course_info = await axios.get(apiKey + "course-info");
        setCourses(course_info.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchData, 10000);

    // Clean up interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [apiKey]);

  const handleRegistration = () => {
    if (!selectedCourse) {
      alert("Please select a course.");
      return;
    }

    if (!disableRegistration) {
      // Simulate the registration process (replace with actual API call)
      setRegistrationMessage(
        `You have successfully registered for ${selectedCourse}.`
      );
      setDisableRegistration(true);
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
            {console.log(courses)}
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.subject}
              </option>
            ))}
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
