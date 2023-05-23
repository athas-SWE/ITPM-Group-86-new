import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import img1 from "./image/DocProfile.png";
import { NavLink } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";

const DocDetails = () => {
  const { id } = useParams("");
  console.log(id);

  const history = useHistory();

  const [getuserdata, setuserdata] = useState([]);
  console.log(getuserdata);

  const getdata = async () => {
    const res = await fetch(`http://localhost:5000/Doctor/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("error");
    } else {
      setuserdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  });

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:5000/Doctor/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("user deleted");
      history.push("/");
    } else {
      console.log("error");
    }
  };

  const genPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });
    doc.setFontSize(20);
    doc.text("SYS Acdemy Detailss", 10, 10);

    doc.autoTable({
      html: "#content",
    });
    doc.save("SYS Acdemy Details.pdf");
  };

  return (
    <div className="container mt-3">
      <div className="container">
        <button className="Back_btn mt-2 mb-5">
          <NavLink className="back" to="/doctorF">
            Back
          </NavLink>
        </button>
      </div>
      <h1 style={{ fontweight: 400 }}>Welcome Tr. {getuserdata.name}</h1>
      <img
        className="logo img mt-4"
        src={img1}
        style={{ width: 100 }}
        alt="profile"
      />
      <div className="add_btn_2 mt-2 mb-20">
        <NavLink to={`/doctorEdit/${getuserdata._id}`}>
          <button className="btn btn-primary mx-2">
            <i class="fa-solid fa-pen"></i>
          </button>
        </NavLink>

        <button
          className="btn btn-danger"
          onClick={() => deleteuser(getuserdata._id)}
        >
          <i class="fa-solid fa-trash"></i>
        </button>

        <button
          onClick={genPDF}
          type="button"
          data-modal-toggle="delete-user-modal"
          className="Report-Button"
        >
          Download Report
        </button>
      </div>

      <div className="row mt-3">
        <table className="table" id="content">
          <thead>
            <tr className="table-dark">
              <th scope="col">Teacher_ID</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Subject</th>
              <th scope="col">Phone</th>
              <th scope="col">E-mail</th>
              <th scope="col">Grade Level</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{getuserdata.doctorID}</th>
              <td>{getuserdata.name}</td>
              <td>{getuserdata.age}</td>
              <td>{getuserdata.gender}</td>
              <td>{getuserdata.specialist}</td>
              <td>{getuserdata.phoneNo}</td>
              <td>{getuserdata.email}</td>
              <td>{getuserdata.wardID}</td>

              <td className="d-flex justify-content-between"></td>
            </tr>
          </tbody>
        </table>

        <div className="left_view col-lg-4 col-md-4 col-8">
          <h3>
            Teacher_ID: <span>{getuserdata.doctorID}</span>
          </h3>
          <h3>
            Name: <span>{getuserdata.name}</span>
          </h3>
          <h3>
            Age: <span>{getuserdata.age}</span>
          </h3>
          <h3>
            Gender: <span>{getuserdata.gender}</span>
          </h3>
          <h3>
            Subject: <span>{getuserdata.specialist}</span>
          </h3>
        </div>
        <div className="right_view col-lg-4 col-md-4 col-8">
          <h3>
            <i class="fa-solid fa-phone"></i> Phone:{" "}
            <span>{getuserdata.phoneNo}</span>
          </h3>
          <h3>
            <i class="fa-solid fa-envelope"></i> E-mail:{" "}
            <span>{getuserdata.email}</span>
          </h3>
          <h3>
            <i class="fa-solid fa-house-medical"></i> Grade Level:{" "}
            <span>{getuserdata.wardID}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DocDetails;
