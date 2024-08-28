import React from "react";
//  import Preloaderr from "./src/Preloaderr";

const StudentLogout = () => {
  const token = localStorage.getItem("login");
  if (token) {
    localStorage.removeItem("login");
    localStorage.removeItem("rollnumber");
    window.location.href = "/student-login";
  }
  return (
    <>
      {/* <Preloaderr /> */}
    </>
  );
};

export default StudentLogout;
