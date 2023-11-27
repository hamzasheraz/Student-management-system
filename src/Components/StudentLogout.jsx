import React from "react";
import Preloaderr from "./Preloaderr";

const StudentLogout = () => {
  const token = localStorage.getItem("accessToken");
  console.log(token);
  if (token) {
    localStorage.removeItem("accessToken");

    window.location.href = "/student-login";
  }
  return (
    <>
      <Preloaderr />
    </>
  );
};

export default StudentLogout;
