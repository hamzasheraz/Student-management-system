import React, { useEffect, useState } from "react";
import "../styleattendance.css";

function Attendance() {
  // Default course
  let [studentAttendance, setstudentAttendance] = useState([]);
  const roll_number = localStorage.getItem("rollnumber");
  useEffect(() => {
    getinitialdata();
  },);

  let getinitialdata = async () => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/displaystudentattendance/${roll_number}`
    );
    let data2 = await data.json();
    console.log(data2);
    setstudentAttendance(data2);
  };

  const getAttendanceTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {studentAttendance &&
            studentAttendance.map((att, index) => (
              <tr key={index}>
                <td>{att.date}</td>
                <td>{att.attendance}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="ccc">
      <div className="attendance-container">
        <h2>Student Attendance</h2>

        {/* Display attendance for the default student and selected course */}
        <div className="attendance-table">{getAttendanceTable()}</div>
      </div>
    </div>
  );
}

export default Attendance;
