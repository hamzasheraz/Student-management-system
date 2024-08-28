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
import Teachermarks from "./Components/Teachermarks";
import Teacherattendance from "./Components/Teacherattendance";
import Teacher from "./Components/Teacher";
import TeacherLogout from "./Components/TeacherLogout";
import StudentProfileEdit from "./Components/StudentProfileEdit";
import TeacherProfileEdit from "./Components/TeacherProfileEdit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/student-login" />} />
        <Route path="/teacher" element={<Navigate to="/teacher-login" />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-dashboard/*" element={<Teacher />}>
          <Route path="marks" element={<Teachermarks />} />
          <Route path="attendance" element={<Teacherattendance />} />
          <Route path="teacher-logout" element={<TeacherLogout />} />
          <Route path="teacher-profile-edit" element={<TeacherProfileEdit />} />
        </Route>
        <Route path="/student-login/*" element={<Home />} />
        <Route path="/dashboard/*" element={<Student />}>
          <Route path="student-profile" element={<Profile />} />
          <Route path="student-profile-edit" element={<StudentProfileEdit />} />
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
