import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { adddata } from "./Context/ContextProvider";

const WardRegister = () => {
  const { udata, setUdata } = useContext(adddata);

  const history = useHistory();

  const [inpval, setINP] = useState({
    wardID: "",
    name: "",
    ICU: "",
    Normal: "",
    TotNoOfPatients: "",
    TotNoOfDoctors: "",
    TotNoOfNurse: "",
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
      wardID,
      name,
      ICU,
      Normal,
      TotNoOfPatients,
      TotNoOfDoctors,
      TotNoOfNurse,
    } = inpval;

    const res = await fetch("http://localhost:5000/Ward/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wardID,
        name,
        ICU,
        Normal,
        TotNoOfPatients,
        TotNoOfDoctors,
        TotNoOfNurse,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
      alert("error");
    } else {
      history.push("/wardF");
      console.log("data added");
      alert("Data added");
      setdata();
      setUdata(data);
    }
  };

  return (
    <div className="container">
      <button className="Back_btn mt-2">
        <NavLink className="back" to="/wardF">
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
              value={inpval.wardID}
              onChange={setdata}
              name="wardID"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Name
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
              value={inpval.ICU}
              onChange={setdata}
              name="ICU"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Present Days
            </label>
            <input
              type="text"
              value={inpval.Normal}
              onChange={setdata}
              name="Normal"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Absent Days
            </label>
            <input
              type="text"
              value={inpval.TotNoOfPatients}
              onChange={setdata}
              name="TotNoOfPatients"
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

export default WardRegister;
