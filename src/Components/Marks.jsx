import React from "react";
import "../stylemarks.css";

function Marks() {
  const marksData = [
    {
      course: "English",
      tests: [
        { test: "Test 1", marks: 90 },
        { test: "Test 2", marks: 85 },
        { test: "Final Exam", marks: 92 },
      ],
    },
    {
      course: "Urdu",
      tests: [
        { test: "Test 1", marks: 90 },
        { test: "Test 2", marks: 85 },
        { test: "Final Exam", marks: 92 },
      ],
    },
    {
      course: "Mathematics",
      tests: [
        { test: "Test 1", marks: 90 },
        { test: "Test 2", marks: 85 },
        { test: "Final Exam", marks: 92 },
      ],
    },
    {
      course: "Computer Science",
      tests: [
        { test: "Test 1", marks: 80 },
        { test: "Test 2", marks: 88 },
        { test: "Final Exam", marks: 95 },
      ],
    },

    {
      course: "Physics",
      tests: [
        { test: "Test 1", marks: 80 },
        { test: "Test 2", marks: 88 },
        { test: "Final Exam", marks: 95 },
      ],
    },
    // Add more courses as needed
  ];

  return (
    <>
      <div className="marks-container">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              {marksData[0]?.tests.map((test, index) => (
                <th key={index}>{test.test}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {marksData.map((course, courseIndex) => (
              <tr key={courseIndex}>
                <td>{course.course}</td>
                {course.tests.map((test, testIndex) => (
                  <td>{test.marks}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Marks;
