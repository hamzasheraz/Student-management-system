import React, { useState } from "react";
import "../stylemarks.css";

const initialStudentData = {
  sectionA: [
    {
      rollNo: "01",
      name: "Ali",
      subjects: {
        English: 86,
        Maths: 77,
        Science: 87,
        ComputerScience: 92,
        SocialStudies: 95,
      },
    },
    {
      rollNo: "02",
      name: "rafay",
      subjects: {
        English: 86,
        Maths: 77,
        Science: 87,
        ComputerScience: 92,
        SocialStudies: 95,
      },
    },
    {
      rollNo: "03",
      name: "moiz",
      subjects: {
        English: 86,
        Maths: 77,
        Science: 87,
        ComputerScience: 92,
        SocialStudies: 95,
      },
    },

    // Add more students for sectionA as needed
  ],
  sectionB: [
    {
      rollNo: "03",
      name: "Shan",
      subjects: {
        English: 86,
        Maths: 77,
        Science: 87,
        ComputerScience: 92,
        SocialStudies: 95,
      },
    },
    // Add more students for sectionB as needed
  ],
  sectionC: [
    {
      rollNo: "05",
      name: "Zeeshan",
      subjects: {
        English: 86,
        Maths: 77,
        Science: 87,
        ComputerScience: 92,
        SocialStudies: 95,
      },
    },
    // Add more students for sectionC as needed
  ],
};

function Teachermarks() {
  const [selectedSection, setSelectedSection] = useState("sectionA");
  const [studentData, setStudentData] = useState(initialStudentData);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleMarksChange = (studentIndex, subject, value) => {
    const updatedStudentData = { ...studentData };
    updatedStudentData[selectedSection][studentIndex].subjects[subject] = value;
    setStudentData(updatedStudentData);
  };

  const handleSaveMarks = () => {
    // Add logic to save marks data (e.g., send to a server)
    console.log(
      `Marks data for ${selectedSection} saved:`,
      studentData[selectedSection]
    );
    alert("Marks saved successfully!");
  };

  // Get the subjects from the first student in the selected section
  const subjects = Object.keys(studentData[selectedSection][0].subjects);

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
        <table>
          <thead>
            <tr>
              <th>Roll No.</th>
              <th>Name</th>
              {subjects.map((subject) => (
                <th key={subject}>{subject}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studentData[selectedSection].map((student, index) => (
              <tr key={index}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                {subjects.map((subject) => (
                  <td key={subject}>
                    <input
                      type="number"
                      value={student.subjects[subject]}
                      onChange={(e) =>
                        handleMarksChange(index, subject, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="save-container">
          <button onClick={handleSaveMarks}>Save Marks</button>
        </div>
      </div>
    </>
  );
}

export default Teachermarks;
