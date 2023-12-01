import React, { useState } from "react";
import "../stylenavbar.css";
import Notifications from "./Notifications";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLight, setIsLight] = useState(false);

  function handleSwitch() {
    setIsLight((prev) => !prev);
  }

  return (
    <div className={`container ${isLight ? "light-theme" : ""}`}>
      <div className="theme-switch" onClick={handleSwitch}>
        <div className="switch"></div>
      </div>
      <div className="navigation">
        <ul>
          <Link to="/profile" className="active">
            Profile
          </Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/marks">Marks</Link>
          <Link to="/feegeneration">Fee</Link>
          <Link to="/timetable">TimeTable</Link>
          <Link to="/cg">Course Registration</Link>
          <Notifications />
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
