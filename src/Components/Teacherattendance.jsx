import React, { useState, useEffect } from "react";
import "../stylemarks.css";

const studentData = {
  sectionA: [
    { rollNo: "01", name: "Ali", attendance: "", date: "" },
    { rollNo: "02", name: "Salman", attendance: "", date: "" },
    // Add more students for sectionA as needed
  ],
  sectionB: [
    { rollNo: "03", name: "Shan", attendance: "", date: "" },
    { rollNo: "04", name: "Aliyan", attendance: "", date: "" },
    // Add more students for sectionB as needed
  ],
  sectionC: [
    { rollNo: "05", name: "Zeeshan", attendance: "", date: "" },
    // Add more students for sectionC as needed
  ],
};

function getCurrentDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

function Teacherattendance() {
  const [selectedSection, setSelectedSection] = useState("sectionA");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
  }, [selectedSection]);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleAttendanceChange = (index, value) => {
    const updatedStudentData = [...studentData[selectedSection]];
    updatedStudentData[index].attendance = value;
    updatedStudentData[index].date = getCurrentDate();
    studentData[selectedSection] = updatedStudentData;
    setSelectedSection(selectedSection);
    setMessage(
      `Attendance marked for ${
        updatedStudentData[index].name
      } on ${getCurrentDate()}`
    );
  };

  const handleSave = () => {
    // Add logic to save attendance data (e.g., send to a server)
    console.log(
      `Attendance data for ${selectedSection} saved:`,
      studentData[selectedSection]
    );
    alert("Attendance saved successfully!");
  };

  return (
    <>
      <div className="marks-container">
        <div className="section-selector">
          <label htmlFor="section">Select Section: </label>
          <select
            id="section"
            value={selectedSection}
            onChange={(e) => handleSectionChange(e.target.value)}
          >
            <option value="sectionA">Section A</option>
            <option value="sectionB">Section B</option>
            <option value="sectionC">Section C</option>
          </select>
        </div>
        <div className="attendance-container">
          <table>
            <thead>
              <tr>
                <th>Roll No.</th>
                <th>Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {studentData[selectedSection].map((student, index) => (
                <tr key={student.rollNo}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>
                    <select
                      value={student.attendance}
                      onChange={(e) =>
                        handleAttendanceChange(index, e.target.value)
                      }
                    >
                      <option value="">--Select--</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                    {student.attendance && (
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
