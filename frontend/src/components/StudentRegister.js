import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { adddata } from "./Context/ContextProvider";

const VisRegister = () => {
  const { udata, setUdata } = useContext(adddata);

  const history = useHistory();

  const [inpval, setINP] = useState({
    visitorNo: "",
    name: "",
    age: "",
    gender: "",
    nic: "",
    email: "",
    phoneNo: "",
    patientNo: "",
    wardID: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    const {
      visitorNo,
      name,
      age,
      gender,
      nic,
      email,
      phoneNo,
      patientNo,
      wardID,
    } = inpval;

    const res = await fetch("http://localhost:5000/Visitor/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorNo,
        name,
        age,
        gender,
        nic,
        email,
        phoneNo,
        patientNo,
        wardID,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
      alert("error");
    } else {
      history.push("/visitorF");
      console.log("data added");
      alert("Data added");
      setdata();
      setUdata(data);
    }
  };

  return (
    <div className="container">
      <button className="Back_btn mt-2">
        <NavLink className="back" to="/visitorF">
          Back
        </NavLink>
      </button>

      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Student_ID
            </label>
            <input
              type="text"
              value={inpval.visitorNo}
              onChange={setdata}
              name="visitorNo"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Student Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Age
            </label>
            <input
              type="text"
              value={inpval.age}
              onChange={setdata}
              name="age"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Gender
            </label>
            <input
              type="text"
              value={inpval.gender}
              onChange={setdata}
              name="gender"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              NIC
            </label>
            <input
              type="text"
              value={inpval.nic}
              onChange={setdata}
              name="nic"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Phone
            </label>
            <input
              type="text"
              value={inpval.phoneNo}
              onChange={setdata}
              name="phoneNo"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Email
            </label>
            <input
              type="text"
              value={inpval.email}
              onChange={setdata}
              name="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Class
            </label>
            <input
              type="text"
              value={inpval.patientNo}
              onChange={setdata}
              name="patientNo"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" onClick={addinpdata} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisRegister;
