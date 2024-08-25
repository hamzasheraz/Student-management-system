import React, { useEffect, useState } from "react";
import "../styletimetable.css";
import axios from "axios";
const TimeTable = () => {
  const [timetableData, setTimetableData] = useState([]);
  // const [studentData, setStudentData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rollNo = localStorage.getItem("rollnumber");
        const studentResponse = await axios.get(
          `http://127.0.0.1:8000/api/studentsdata/${rollNo}`
        );
        // setStudentData(studentResponse.data);

        const timeResponse = await axios.get(
          `http://127.0.0.1:8000/api/view-timetable/${studentResponse.data.section}`
        );
        setTimetableData(timeResponse.data);
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    };

    fetchData();
  }, []);

  const getRandomColor = () => {
    const colors = ["sky", "green", "yellow", "purple", "pink", "lightred"]; // Add more colors if needed
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const renderLecture = (lecture) => (
    <div key={lecture.id}>
      <span
        className={`bg-${getRandomColor()} padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13`}
      >
        {lecture.lecture_title}
      </span>
      <div className="margin-10px-top font-size14">{lecture.duration}</div>
      <div className="font-size13 text-light-gray">{lecture.lecturer}</div>
    </div>
  );

  const timeSlot = [
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 1:00",
    "1:00 - 2:00",
  ];

  return (
    <>
      <div className="container1">
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead>
              <tr className="bg-light-gray">
                <th className="text-uppercase">Time</th>
                <th className="text-uppercase">Monday</th>
                <th className="text-uppercase">Tuesday</th>
                <th className="text-uppercase">Wednesday</th>
                <th className="text-uppercase">Thursday</th>
                <th className="text-uppercase">Friday</th>
                <th className="text-uppercase">Saturday</th>
              </tr>
            </thead>
            <tbody>
              {timeSlot.map((time) => (
                <tr key={time}>
                  <td className="align-middle">{time}</td>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => (
                    <td key={day} className="text-center">
                      {timetableData
                        .filter(
                          (lecture) =>
                            lecture.day_of_week === day &&
                            lecture.duration === time
                        )
                        .map(renderLecture)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TimeTable;
