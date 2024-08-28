import React, { useEffect, useState } from "react";
import "../stylemarks.css";
// import Navbar from "./navbar";

function Marks() {
  const tests = ["test1", "test2", "finalExam"];
  const [selectedTest, setSelectedTest] = useState("test1");
  const [marksData, setMarksData] = useState({});
  const rollNumber = localStorage.getItem("rollnumber");

  useEffect(() => {
    getMarksData();
  },);

  const getMarksData = async () => {
    try {
      const data = await fetch(
        `http://127.0.0.1:8000/api/students2data/${rollNumber}/${selectedTest}`
      );
      const resp = await data.json();
      console.log("got data after test", resp);
      setMarksData(resp[0] || {});
    } catch (error) {
      console.error("Error fetching marks data:", error);
    }
  };

  const excludedKeys = ["id", "testtype", "rollno"];

  return (
    <>
      <div className="marks-container">
        <label htmlFor="testSelect">Select Test:</label>
        <select
          id="testSelect"
          value={selectedTest}
          onChange={(e) => setSelectedTest(e.target.value)}
        >
          {tests.map((test, index) => (
            <option key={index} value={test}>
              {test}
            </option>
          ))}
        </select>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(marksData).map(
              ([key, value], index) =>
                !excludedKeys.includes(key) && (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Marks;
