import React from "react";
import { useState } from "react";
// import '/styles/style.css';
import "../styleattendance.css";
function Attendance() {
  const [selectedSection, setSelectedSection] = useState("courseA"); // Default section

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
    // Add logic to fetch and display attendance data for the selected section
  };

  return (
    <div>
      <div className="attendance-container">
        <h2>Student Attendance</h2>
        <div className="section-selector">
          <label htmlFor="section">Select course:</label>
          <select
            id="section"
            name="section"
            value={selectedSection}
            onChange={handleSectionChange}
          >
            <option value="courseA">course A</option>
            <option value="courseB">course B</option>
            {/* Add more sections as needed */}
          </select>
        </div>

        {/* Display attendance for the selected section */}
        <div className="attendance-table">
          {/* Add attendance table based on the selectedSection */}
          <p>Attendance table for {selectedSection}</p>
          {
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2023-01-01</td>
                  <td>P</td>
                </tr>
                {/* Add more attendance data as needed */}
              </tbody>
            </table>
          }
        </div>
      </div>
    </div>
  );
}

export default Attendance;
