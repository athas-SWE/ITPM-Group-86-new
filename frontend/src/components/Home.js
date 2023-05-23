import React from "react";
import Typical from "react-typical";
import img2 from "./image/Nurse.png";
import img1 from "./image/Doctor.png";
import img3 from "./image/patient.png";
import img4 from "./image/Visitor.png";
import img5 from "./image/madicine.png";
import img6 from "./image/lab.png";
import img7 from "./image/Ward.png";
import img8 from "./image/Report.png";

function Home({ setLoginUser }) {
  return (
    <div>
      <div className="profile-detail-role">
        <center>
          <span className="primary-text">
            {" "}
            <h1>
              {" "}
              <Typical
                steps={[
                  "Welcome to",
                  1000,
                  "SYS Academy",
                  1000,
                  "Student Performance Guide",
                  1000,
                ]}
                Loop={Infinity}
              />
            </h1>
          </span>
        </center>
      </div>

      <div className="homepage1">
        <div className="button" onClick={() => setLoginUser({})}>
          <a href="/">Logout</a>
        </div>
      </div>

      <center>
        <div className="content-box">
          <div className="card">
            <a href="/doctorF">
              <img
                className="logo img mt-4"
                src={img1}
                style={{ width: 100 }}
                alt="profile"
              />
              <h2 style={{ color: "#082340" }}>Teacher</h2>
            </a>
          </div>
          <div className="card">
            <a href="/nurseF">
              <img
                className="logo img mt-4"
                src={img2}
                style={{ width: 80 }}
                alt="profile"
              />
              <h2 style={{ color: "#082340" }}>Parents</h2>
            </a>
          </div>
          <div className="card">
            <a href="/patientF">
              <img
                className="logo img mt-4"
                src={img3}
                style={{ width: 100 }}
                alt="profile"
              />
              <h2 style={{ color: "#082340" }}>Student</h2>
            </a>
          </div>
          <div className="card">
            <a href="/visitorF">
              <img
                className="logo img mt-4"
                src={img4}
                style={{ width: 100 }}
                alt="profile"
              />
              <h2 style={{ color: "#082340" }}>Class Details</h2>
            </a>
          </div>
          <div className="card">
            <a href="/wardF">
              <img
                className="logo img mt-4"
                src={img7}
                style={{ width: 100 }}
                alt="profile"
              />
              <h2 style={{ color: "#082340" }}>Attendance</h2>
            </a>
          </div>
          <div className="card">
            <a href="/StudentReport">
              <img
                className="logo img mt-4"
                src={img5}
                style={{ width: 100 }}
                alt="profile"
              />
              <h2 style={{ color: "#082340" }}>Student Report</h2>
            </a>
          </div>
          <div className="card">
            <a href="/medicine">
              <img
                className="logo img mt-4"
                src={img5}
                style={{ width: 100 }}
                alt="profile"
              />
              <h2 style={{ color: "#082340" }}>feedback</h2>
            </a>
          </div>
          <div className="card">
            <a href="/cal">
              <img
                className="logo img mt-4"
                src={img6}
                style={{ width: 100 }}
                alt="profile"
              />
              <h2 style={{ color: "#082340" }}>Results</h2>
            </a>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Home;
