import React from "react";
// import Preloaderr from "./Preloaderr";
// import Preloaderr from "./preloaderr";

const TeacherLogout = () => {
  const token = localStorage.getItem("login");
  if (token) {
    localStorage.removeItem("login");
    localStorage.removeItem("username");
    localStorage.removeItem("section");
    window.location.href = "/teacher-login";
  }
  return (
    <>
      {/* <Preloaderr /> */}
    </>
  );
};

export default TeacherLogout;
