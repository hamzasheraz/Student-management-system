import "./App.css";
import Home from "./Components/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import TeacherLogin from "./Components/TeacherLogin";
import Attendance from "./Components/Attendance";
import CourseRegistration from "./Components/CourseRegistration";
import Profile from "./Components/Profile";
import Marks from "./Components/Marks";
import TimeTable from "./Components/TimeTable";
import FeeGeneration from "./Components/FeeGeneration";
import StudentLogout from "./Components/StudentLogout";
import Student from "./Components/Student";

function App() {
  return (
    <div className="App">
      <div>oewiurss</div>
      <Routes>
        <Route path="/" element={<Navigate to="/student-login" />} />
        <Route path="/student-login/*" element={<Home />} />
        <Route path="/dashboard/*" element={<Student />}>
          <Route path="student-profile" element={<Profile />} />
          <Route path="student-fee-payment" element={<FeeGeneration />} />
          <Route
            path="student-course-registeration"
            element={<CourseRegistration />}
          />
          <Route path="student-attendance" element={<Attendance />} />
          <Route path="student-marks" element={<Marks />} />
          <Route path="student-time-table" element={<TimeTable />} />
          <Route path="student-logout" element={<StudentLogout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
