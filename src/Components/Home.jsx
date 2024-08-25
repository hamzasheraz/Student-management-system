import React, { useState } from "react";
import "../style.css";
import axios from "axios";
// import preloader from "./Preloaderr";

export default function Home() {
  const [rollNum, setRollNum] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [islogin, setLogin] = useState(false);

  // let apiKey = process.env.REACT_APP_API_KEY;

  const func = (event) => {
    event.preventDefault();
    if (rollNum && password) {
      axios
        .post("http://127.0.0.1:8000/api/student-login/", { rollNum, password })
        .then((response) => {
          if (response.data.status) {
            // sessionStorage.setItem("studentLoginStatus", true);
            // const accessToken = response.data.access_token;
            localStorage.setItem("rollnumber", response.data.roll_number);
            localStorage.setItem("login", true);
            // setLogin(true);
            window.location.href = "/dashboard";
          }
          /* set state true to show user dashboard*/
        })
        .catch((error) => {
          if (error.request.status === 401)
            setErrorMessage("Incorrect RollNumber or Password");
          else setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Please fill in both the fields");
    }
  };
  return (
    <>
      <div>
        <div className="sidenav">
          <div className="login-main-text">
            <h2>
              Student Application
              <br /> Login Page
            </h2>
            <p>Login from here to access.</p>
          </div>
        </div>
        <div className="main">
          <div className="col-md-6 col-sm-12">
            <div className="login-form">
              <form>
                <div className="form-group">
                  <label>Roll-Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={rollNum}
                    onChange={(event) => {
                      setRollNum(event.target.value);
                    }}
                    placeholder="Roll Number"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                    placeholder="Password"
                  />
                </div>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <div className="spacedalo">
                  <button
                    type="submit"
                    className="btn btn-black"
                    onClick={func}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
