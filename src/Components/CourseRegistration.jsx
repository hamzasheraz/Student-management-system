import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseRegistration = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [registered, setRegistered] = useState(false);
  const [disableRegistration, setDisableRegistration] = useState(false);
  const [courses, setCourses] = useState([]);
  const [studentData, setStudentData] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const rollNumber = localStorage.getItem("rollnumber");

  // const token = localStorage.getItem("accessToken");

  // // Set the default authorization header for all axios requests
  // axios.defaults.headers.common["Authorization"] = `JWT ${token}`;

  useEffect(() => {
    // Fetch student and academy data using the token
    const fetchData = async () => {
      try {
        // Fetch student data
        const studentResponse = await axios.get(
          `http://127.0.0.1:8000/api/studentsdata/${rollNumber}`
        );
        setStudentData(studentResponse.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [rollNumber]);

  useEffect(() => {
    // Fetch courses from the backend only if the student has not registered for any course
    if (!studentData.course) {
      const fetchCourseData = async () => {
        try {
          // Fetch course data
          const courseInfoResponse = await axios.get(
            `http://127.0.0.1:8000/api/course-info`
          );
          setCourses(courseInfoResponse.data);
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      };

      fetchCourseData();
    }
  }, [studentData.course]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const course_id = studentData.course;

        const courseTitle = courses.find(
          (course) => course.id === course_id
        )?.course_title;
        setCourseTitle(courseTitle);
        const subjectInfo = await axios.get(
          `http://127.0.0.1:8000/api/subjects-info/${course_id}`
        );
        setSubjects(subjectInfo.data); // Assuming subjectInfo has a data property
      } catch (error) {
        console.error("Error fetching subject data:", error);
      }
    };

    if (registered || studentData.course) {
      fetchSubjects();
    }
  }, [registered, studentData.course, courses]);

  const handleRegistration = () => {
    if (!selectedCourse) {
      alert("Please select a course.");
      return;
    } else {
      axios
        .post("http://127.0.0.1:8000/api/register-student/", {
          selectedCourse,
          rollNumber,
        })
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
