import React, { useEffect, useState } from "react";
import "../stylemarks.css";

function Teachermarks() {
  const selectedSection="SectionB";
  const [selectedTest, setSelectedTest] = useState("test1");
  const [studentData, setStudentData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  // const sections = ["SectionA", "SectionB", "SectionC"];
  const tests = ["test1", "test2", "finalExam"];

  useEffect(() => {
    getInitialData();
  },);

  useEffect(() => {
    getInitialData();
  },);

  // const section = localStorage.getItem("section");
  const getInitialData = async () => {
    try {
      const section = localStorage.getItem("section");
      // setSelectedSection(section);
      // console.log('section is',section)
      // console.log("selected section is",selectedSection)
      const response = await fetch(
        `http://127.0.0.1:8000/api/studentsdata/${section}/${selectedTest}`
      );
      const data = await response.json();

      // Extract subjects dynamically from the first student record
      const firstStudent = data[0];
      const subjectsList = firstStudent
        ? Object.keys(firstStudent).filter(
            (key) => key !== "id" && key !== "testtype" && key !== "rollno"
          )
        : [];

      console.log(data);
      setStudentData(data);
      setSubjects(subjectsList);
    } catch (error) {
      console.error("Error fetching student data:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  // const handleSectionChange = (section) => {
  //   setSelectedSection(section);
  // };

  const handleTestChange = (t) => {
    setSelectedTest(t);
  };

  const handleMarksChange = (rollNo, test, subject, value) => {
    const updatedStudentData = [...studentData];
    const updatedStudentIndex = updatedStudentData.findIndex(
      (student) => student.id === rollNo
    );

    if (updatedStudentIndex !== -1) {
      const updatedStudent = updatedStudentData[updatedStudentIndex];
      updatedStudent[subject] = value;

      setStudentData(updatedStudentData);
    }
  };

  // const handleSaveMarksToBackend = async () => {
  //   try {
  //      console.log(studentData);
  //      console.log(selectedSection);
  //      console.log(selectedTest);
  //     const response = await fetch(/api/update_student_marks/${selectedSection}/${selectedTest}/, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(studentData),
  //     });

  //     if (response.ok) {
  //       console.log('Marks saved successfully!');
  //       alert('Marks saved successfully!');
  //     } else {
  //       console.error('Failed to save marks:', response.statusText);
  //       alert('Failed to save marks. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error saving marks:', error);
  //     alert('An unexpected error occurred. Please try again.');
  //   }
  // };

  // ... (previous code)

  const handleSaveMarksToBackend = async () => {
    try {
      console.log(studentData);
      console.log(selectedSection);
      console.log(selectedTest);
      const section = localStorage.getItem("section");
      // Iterate over each student and send individual requests
      for (const student of studentData) {
        const response = await fetch(
          `http://127.0.0.1:8000/api/update_student_marks/${section}/${selectedTest}/${student.rollno}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
          }
        );

        if (!response.ok) {
          console.error(
            `Failed to save marks for student ${student.rollno}:`,
            response.statusText
          );
          alert(
            `Failed to save marks for student ${student.rollno}. Please try again.`
          );
          return; // Stop the loop on the first failure
        }
      }

      console.log("All marks saved successfully!");
      alert("All marks saved successfully!");
    } catch (error) {
      console.error("Error saving marks:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="marks-container">
        <div className="section-selector">
          <label htmlFor="section">Select Section: </label>
          {/* <select
            id="section"
            value={selectedSection}
            onChange={(e) => handleSectionChange(e.target.value)}
          >
           
           {section}
          </select> */}

          <select
            id="test"
            value={selectedTest}
            onChange={(e) => handleTestChange(e.target.value)}
          >
            {tests.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>

              {/* Display dynamic subjects */}
              {subjects.map((subject) => (
                <th key={subject}>{`${selectedTest} - ${subject}`}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {studentData &&
              studentData
                .filter((student) => student.testtype === selectedTest)
                .map((student, index) => (
                  <tr key={index}>
                    <td>{student.rollno}</td>
                    {/* Display marks for each subject in the selected test */}
                    {Object.keys(student).map(
                      (subject) =>
                        !["id", "testtype", "rollno"].includes(subject) && (
                          <td key={subject}>
                            <input
                              type="number"
                              value={student[subject]}
                              onChange={(e) =>
                                handleMarksChange(
                                  student.id,
                                  selectedTest,
                                  subject,
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        )
                    )}
                  </tr>
                ))}
          </tbody>
        </table>
        <div className="save-container">
          <button onClick={handleSaveMarksToBackend}>Save Marks</button>
        </div>
      </div>
    </>
  );
}

export default Teachermarks;
