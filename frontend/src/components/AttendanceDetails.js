import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import img2 from "./image/Ward.png";
import { NavLink } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";

const WardDetails = () => {
  const { id } = useParams("");
  console.log(id);

  const history = useHistory();

  const [getuserdata, setuserdata] = useState([]);
  console.log(getuserdata);

  const getdata = async () => {
    const res = await fetch(`http://localhost:5000/Ward/getuser/${id}`, {
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
    const res2 = await fetch(`http://localhost:5000/Ward/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("user deleted");
      history.push("/visitorF");
    } else {
      console.log("error");
    }
  };

  const genPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });
    doc.setFontSize(20);
    doc.text(
      "Sys Academy                                                   Attendance Details",
      10,
      10
    );

    doc.autoTable({
      html: "#content",
    });
    doc.save("Attendance Details.pdf");
  };

  return (
    <div className="container mt-3">
      <div className="container">
        <button className="Back_btn mt-2 mb-5">
          <NavLink className="back" to="/wardF">
            Back
          </NavLink>
        </button>
      </div>
      <h1 style={{ fontweight: 400 }}>
        Details of Student attendance - {getuserdata.name}
      </h1>
      <img
        className="logo img mt-4"
        src={img2}
        style={{ width: 100 }}
        alt="profile"
      />
      <div className="add_btn_2 mt-2 mb-20">
        <NavLink to={`/wardEdit/${getuserdata._id}`}>
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
              <th scope="col">Student_ID</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Address</th>
              <th scope="col">Total Days Present</th>
              <th scope="col">Total_Days Absent</th>

              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{getuserdata.wardID}</th>
              <td>{getuserdata.name}</td>
              <td>{getuserdata.ICU}</td>
              <td>{getuserdata.Normal}</td>
              <td>{getuserdata.TotNoOfPatients}</td>
              <td>{getuserdata.TotNoOfDoctors}</td>
              <td>{getuserdata.TotNoOfNurse}</td>
              <td className="d-flex justify-content-between"></td>
            </tr>
          </tbody>
        </table>

        <div className="left_view col-lg-4 col-md-4 col-8">
          <h3>
            Student ID: <span>{getuserdata.wardID}</span>
          </h3>
          <h3>
            Name: <span>{getuserdata.name}</span>
          </h3>
          <h3>
            Age: <span>{getuserdata.ICU}</span>
          </h3>
          <h3>
            Present Days: <span>{getuserdata.Normal}</span>
          </h3>
          <h3>
            Absent Days: <span>{getuserdata.TotNoOfPatients}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default WardDetails;
