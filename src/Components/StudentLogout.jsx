import React from "react";
import Preloaderr from "./Preloaderr";

const StudentLogout = () => {
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");

  if (studentLoginStatus === "true") {
    localStorage.removeItem("studentLoginStatus");

    window.location.href = "/student-login";
  }
  return (
    <>
      <Preloaderr />
    </>
  );
};

export default StudentLogout;
