import React, { useState, useEffect } from "react";
import "../stylemarks.css";

function getCurrentDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

function Teacherattendance() {
  const [studentData, setStudentData] = useState([]);
  // const [selectedSection, setSelectedSection] = useState("SectionA");
  const [attendanceData, setAttendanceData] = useState({});
  const [message, setMessage] = useState("");
  const [date, setdate] = useState(null);

  useEffect(() => {
    getInitialData();
    setMessage("");
  }, []);

  const getInitialData = async () => {
    const section = localStorage.getItem("section");
    console.log(section)
    setdate(getCurrentDate);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/studentsattendancedata/${section}`
      );
      const data = await response.json();
      setStudentData(data);
      console.log(data);
      // Initialize attendance data with default values
      const initialAttendanceData = {};
      data.forEach((student) => {
        initialAttendanceData[student.rollno] = {
          attendance: "",
          date: getCurrentDate(),
        };
      });
      setAttendanceData(initialAttendanceData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleSectionChange = (section) => {
  //   setSelectedSection(section);
  // };

  const handleAttendanceChange = (rollNo, value) => {
    const updatedAttendanceData = { ...attendanceData };

    if (updatedAttendanceData[rollNo]) {
      updatedAttendanceData[rollNo].attendance = value;
      for (const student of studentData) {
        if (student.rollno === rollNo) {
          student.attendance = value;
        }
      }

      setMessage(`Attendance marked for ${rollNo} on ${getCurrentDate()}`);
      setAttendanceData(updatedAttendanceData);
      console.log("Updated", updatedAttendanceData);
      console.log(studentData);
    } else {
      console.error(`Attendance data for ${rollNo} not found.`);
    }
  };

  const handleSave = async () => {
    let flag = true;
    studentData.forEach((student) => {
      if (attendanceData[student.rollno].attendance === "") {
        alert("First mark attendance for all students");
        flag = false;
      }
    });

    if (flag) {
      const section = localStorage.getItem("section");
      console.log(`Attendance data for ${section} saved:`,attendanceData);
      for (const student of studentData) {
        student.date = date;
        student.attendance = attendanceData[student.rollno].attendance;
        const response = await fetch(
          `http://127.0.0.1:8000/api/updatestudentattendance/${section}/${student.rollno[0]}/${date}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
          }
        );
        if (!response.ok) {
          console.error(
            `Failed to save attendance for student ${student.rollno[0]}:`,
            response.statusText
          );
          alert(
            `Failed to save attendance for student ${student.rollno[0]}. Please try again.`
          );
          return; // Stop the loop on the first failure
        }
      }

      alert("Attendance saved successfully!");
    }
  };

  return (
    <>
      <div className="marks-container">
        <div className="section-selector">
          {/* <label htmlFor="section">Select Section: </label> */}
          {/* <select
            id="section"
            value={selectedSection}
            onChange={(e) => handleSectionChange(e.target.value)}
          >
            <option value="SectionA">Section A</option>
            <option value="SectionB">Section B</option>
            <option value="SectionC">Section C</option>
          </select> */}
        </div>
        <div className="attendance-container">
          <table>
            <thead>
              <tr>
                <th>Roll No.</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student) => (
                <tr key={student.rollno[0]}>
                  <td>{student.rollno[0]}</td>
                  <td>
                    <select
                      value={
                        attendanceData[student.rollno[0]]?.attendance || ""
                      }
                      onChange={(e) =>
                        handleAttendanceChange(
                          student.rollno[0],
                          e.target.value
                        )
                      }
                    >
                      <option value="">--Select--</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                    {attendanceData[student.rollno[0]]?.attendance && (
                      <span className="message">{message}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="save-container">
          <button onClick={handleSave}>Save Attendance</button>
        </div>
      </div>
    </>
  );
}

export default Teacherattendance;
