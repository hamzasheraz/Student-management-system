import React, { useEffect, useState } from "react";
import "../styleprofile.css";
import axios from "axios";

function Profile() {
  let apiKey = process.env.REACT_APP_API_KEY;

  const token = localStorage.getItem("accessToken");

  // Set the default authorization header for all axios requests
  axios.defaults.headers.common["Authorization"] = `JWT ${token}`;

  const [studentData, setStudentData] = useState({});
  const [academyData, setAcademyData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student and academy data using the token
    const token1 = localStorage.getItem("accessToken");

    if (token1) {
      // Redirect only if not already on the student profile page
      if (window.location.pathname !== "/dashboard/student-profile") {
        window.location = "/dashboard/student-profile";
      }
    } else {
      // Redirect only if not already on the student login page
      if (window.location.pathname !== "/student-login") {
        window.location.href = "/student-login";
      }
    }

    const fetchData = async () => {
      try {
        // Fetch student data
        const studentResponse = await axios.get(apiKey + "/student-info");
        setStudentData(studentResponse.data);
        // console.log(studentData1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  const Academy = {
    Name: "Kips",
    email: "kips@gmail.com",
  };

  return (
    <div className="pageon">
      <div id="page-body">
        {/* student acaedmic */}
        <section className="home-section">
          {/* <div className="text" style={{ fontWeight: 'bolder' }}>
                    <i className="bx bx-home"></i>&nbsp;Student Home Page
                 </div> */}
          <div className="main-body">
            <div className="student-info">
              <h2>Academic Information</h2>
              <div>
                <strong>Name:</strong> {studentData.first_name}{" "}
                {studentData.last_name}
              </div>
              <div>
                <strong>Roll Number:</strong> {studentData.roll_number}
              </div>
              <div>
                <strong>Department:</strong> {studentData.department}
              </div>
              <div>
                <strong>Batch:</strong> {studentData.batch}
              </div>
              <div>
                <strong>Email:</strong> {studentData.email}
              </div>
            </div>
          </div>
        </section>

        {/* academy info */}
        <section className="home-section">
          <div className="main-body">
            <div className="student-info">
              <h2>Other Academy info</h2>
              <div>
                <strong>Name:</strong> {Academy.Name}
              </div>

              <div>
                <strong>Department:</strong> {studentData.department}
              </div>
              <div>
                <strong>Batch:</strong> {studentData.batch}
              </div>
              <div>
                <strong>Email:</strong> {Academy.email}
              </div>
            </div>
          </div>
        </section>

        {/* personal info */}
        <section className="home-section">
          {/* <div className="text" style={{ fontWeight: 'bolder' }}>
                    <i className="bx bx-home"></i>&nbsp;Student Home Page
                 </div> */}

          <div className="main-body">
            <div className="student-info">
              <h2>Personal Information</h2>
              <div>
                <strong>Name:</strong>
                {studentData.first_name} {studentData.last_name}
              </div>
              <div>
                <strong>Blood group:</strong> {studentData.blood_group}
              </div>
              <div>
                <strong>Cnic:</strong> {studentData.cnic}
              </div>
              <div>
                <strong>DOB:</strong> {studentData.dob}
              </div>
              <div>
                <strong>Mobile Number:</strong> {studentData.mobile_number}
              </div>
              <div>
                <strong>Nationality:</strong> {studentData.nationality}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
