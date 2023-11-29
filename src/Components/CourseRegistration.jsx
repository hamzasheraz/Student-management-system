import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseRegistration = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiKeyCourseInfo = `${apiKey}course-info/`;
  const apiKeyRegisterStudent = `${apiKey}register-student/`;
  const apiKeyStudentInfo = `${apiKey}student-info/`;
  const apiKeySubjectInfo = `${apiKey}subjects-info/`;

  const [selectedCourse, setSelectedCourse] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [registered, setRegistered] = useState(false);
  const [disableRegistration, setDisableRegistration] = useState(false);
  const [courses, setCourses] = useState([]);
  const [studentData, setStudentData] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");

  const token = localStorage.getItem("accessToken");

  // Set the default authorization header for all axios requests
  axios.defaults.headers.common["Authorization"] = `JWT ${token}`;

  useEffect(() => {
    // Fetch student and academy data using the token
    const fetchData = async () => {
      try {
        // Fetch student data
        const studentResponse = await axios.get(apiKeyStudentInfo);
        setStudentData(studentResponse.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [apiKeyStudentInfo]);

  useEffect(() => {
    // Fetch courses from the backend only if the student has not registered for any course
    if (!studentData.course) {
      const fetchCourseData = async () => {
        try {
          // Fetch course data
          const courseInfoResponse = await axios.get(apiKeyCourseInfo);
          setCourses(courseInfoResponse.data);
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      };

      fetchCourseData();
    }
  }, [apiKeyCourseInfo, studentData.course]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const course_id = studentData.course;

        const courseTitle = courses.find(
          (course) => course.id === course_id
        )?.course_title;
        setCourseTitle(courseTitle);

        const subjectInfo = await axios.get(apiKeySubjectInfo);
        setSubjects(subjectInfo.data); // Assuming subjectInfo has a data property
      } catch (error) {
        console.error("Error fetching subject data:", error);
      }
    };

    if (registered || studentData.course) {
      fetchSubjects();
    }
  }, [registered, studentData.course, courses, apiKeySubjectInfo]);

  const handleRegistration = () => {
    if (!selectedCourse) {
      alert("Please select a course.");
      return;
    } else {
      axios
        .post(apiKeyRegisterStudent, { selectedCourse })
        .then((response) => {
          if (response.data) {
            setRegistrationMessage(
              `You have successfully registered for ${selectedCourse}.`
            );
            setRegistered(true);
            setDisableRegistration(true);
          }
        })
        .catch((error) => {
          if (error.request.status === 404)
            setRegistrationMessage(
              "Not able to register, try again registering."
            );
          else setRegistrationMessage(error.message);
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Course Registration</h2>
      {registrationMessage && (
        <p className="text-success">{registrationMessage}</p>
      )}
      {subjects.length > 0 && (
        <>
          <h3>Subjects for the course:{courseTitle}</h3>
          <ul>
            {subjects.map((subject) => (
              <li key={subject.id}>{subject.subject}</li>
            ))}
          </ul>
        </>
      )}
      <div className="form-group">
        <label>Select Course:</label>
        <select
          className="form-control"
          value={selectedCourse}
          onChange={(event) => setSelectedCourse(event.target.value)}
          disabled={disableRegistration || studentData.course}
        >
          <option value="" disabled={disableRegistration || studentData.course}>
            {disableRegistration || studentData.course
              ? "Registration Closed"
              : "Select"}
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.course_title}
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-primary"
        onClick={handleRegistration}
        disabled={disableRegistration || studentData.course}
      >
        Register
      </button>
    </div>
  );
};

export default CourseRegistration;
