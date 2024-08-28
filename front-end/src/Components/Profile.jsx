import React, { useEffect, useState } from "react";
import "../styleprofile.css";
import axios from "axios";

function Profile() {
  // const token = localStorage.getItem("accessToken");

  // // Set the default authorization header for all axios requests
  // axios.defaults.headers.common["Authorization"] = `JWT ${token}`;

  const [studentData, setStudentData] = useState({});
  // const [academyData, setAcademyData] = useState({});
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student and academy data using the token
    const token1 = localStorage.getItem("login");

    if (!token1) {
      // Redirect only if not already on the student login page
      if (window.location.pathname !== "/student-login") {
        window.location.href = "/student-login";
      }
    }

    const fetchData = async () => {
      try {
        // Fetch student data
        const rollNumber = localStorage.getItem("rollnumber");
        const studentResponse = await axios.get(
          `http://127.0.0.1:8000/api/studentsdata/${rollNumber}`
        );
        setStudentData(studentResponse.data);
        // console.log(studentData1);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                <strong>Name:</strong> {studentData.name}
              </div>
              <div>
                <strong>Roll Number:</strong> {studentData.rollNumber}
              </div>
              <div>
                <strong>Department:</strong> {studentData.department}
              </div>
              <div>
                <strong>Section:</strong> {studentData.section}
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
                <strong>Section:</strong> {studentData.section}
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
                {studentData.name}
              </div>
              <div>
                <strong>Blood group:</strong> {studentData.group}
              </div>
              <div>
                <strong>Cnic:</strong> {studentData.cnic}
              </div>
              <div>
                <strong>DOB:</strong> {studentData.dob}
              </div>
              <div>
                <strong>Mobile Number:</strong> {studentData.MobileNo}
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
