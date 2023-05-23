import React, { useState } from "react";

const EmailSend = () => {
  return (
    <div className="container">
      <center>
        <div className="welcome">
          <h3>Welcome to SYS Academy</h3>
        </div>
      </center>

      <div className="homepage2">
        <div className="button">
          <a href="/home">Dashboard</a>
        </div>
      </div>

      <h3 className="text-center text-success mb-2 mt-4">
        Requesting for Given Feedback{" "}
      </h3>
      <h6 className="text-secondary text-center mb-4 mt-1">SYS Academy</h6>
      <div class="row">
        <div className="col-sm-4 mx-auto shadow p-5">
          <h4 className="text-center mb-2">Feedback </h4>
          <p class="mb-3 mt-2" style={{ color: "green", marginLeft: "57px" }}>
            <b></b>
          </p>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="To"
              name="to"
              value={"infobsc12@gmail.com"}
            />
          </div>
          <div className="form-group  mb-4 ">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Subject"
              name="subject"
              value={"feedback"}
            />
          </div>
          <div className="form-group  mb-4">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter the  feedback"
              name="description"
            />
          </div>

          <button
            className="btn btn-primary btn-block "
            style={{ marginLeft: "100px" }}
          >
            <a href="/home">Request</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSend;
