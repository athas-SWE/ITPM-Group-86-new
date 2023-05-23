import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { adddata, deletedata } from "./Context/ContextProvider";
import { updatedata } from "./Context/ContextProvider";

import jsPDF from "jspdf";
import "jspdf-autotable";

const NurseF = () => {
  const [getuserdata, setuserdata] = useState([]);
  console.log(getuserdata);

  const { udata, setUdata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deletedata);
  const getdata = async (e) => {
    const res = await fetch("http://localhost:5000/Nurse", {
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
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:5000/Nurse/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("user deleted");
      setDLTdata(deletedata);
      getdata();
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
      "JMH                                                     Nurse Details",
      10,
      10
    );

    doc.autoTable({
      html: "#content",
    });
    doc.save("Nurse Details.pdf");
  };

  return (
    <>
      {udata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Success!</strong> User added succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {updata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Success!</strong> User updated succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {dltdata ? (
        <>
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Success!</strong> User deleted succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

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

      <div className="mt-1">
        <div className="container">
          <div>
            <h1 className="heading1">
              Parents<i class="fa-solid fa-user-nurse"></i>
            </h1>
          </div>
          <div className="add_btn mt-2 mb-2">
            <button
              onClick={genPDF}
              type="button"
              data-modal-toggle="delete-user-modal"
              className="Report-Button"
            >
              Download Report
            </button>
            <NavLink to="/NurRegister" className="btn btn-primary">
              Add data
            </NavLink>
          </div>

          <table className="table" id="content">
            <thead>
              <tr className="table-dark">
                <th scope="col">Parents No</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
                <th scope="col">Phone</th>
                <th scope="col">E-mail</th>
                <th scope="col">Address</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{element.nurseID}</th>
                      <td>{element.name}</td>
                      <td>{element.age}</td>
                      <td>{element.gender}</td>
                      <td>{element.phoneNo}</td>
                      <td>{element.email}</td>
                      <td>{element.wardID}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`NurseView/${element._id}`}>
                          <button className="btn btn-success">
                            <i class="fa-solid fa-eye"></i>
                          </button>
                        </NavLink>
                        <NavLink to={`NurseEdit/${element._id}`}>
                          <button className="btn btn-primary">
                            <i class="fa-solid fa-pen"></i>
                          </button>
                        </NavLink>

                        <button
                          className="btn btn-danger"
                          onClick={() => deleteuser(element._id)}
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NurseF;
