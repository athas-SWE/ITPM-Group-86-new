import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { adddata } from "./Context/ContextProvider";

const RepRegister = () => {
  const { udata, setUdata } = useContext(adddata);

  const history = useHistory();

  const [inpval, setINP] = useState({
    patientNo: "",
    wardID: "",
    rbc: "",
    hgb: "",
    hct: "",
    mcv: "",
    mch: "",
    mchc: "",
    rdwcv: "",
    rdwsd: "",
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
    const { patientNo, wardID, rbc, hgb, hct, mcv, mch, mchc, rdwcv, rdwsd } =
      inpval;

    const res = await fetch("http://localhost:5000/Health_info/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientNo,
        wardID,
        rbc,
        hgb,
        hct,
        mcv,
        mch,
        mchc,
        rdwcv,
        rdwsd,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
      alert("error");
    } else {
      history.push("/reportF");
      console.log("data added");
      alert("Data added");
      setdata();
      setUdata(data);
    }
  };

  return (
    <div className="container">
      <button className="Back_btn mt-2">
        <NavLink className="back" to="/reportF">
          Back
        </NavLink>
      </button>

      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              patientNo
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
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Ward_ID
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
              RBC
            </label>
            <input
              type="text"
              value={inpval.rbc}
              onChange={setdata}
              name="rbc"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              HGB
            </label>
            <input
              type="text"
              value={inpval.hgb}
              onChange={setdata}
              name="hgb"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              HCT
            </label>
            <input
              type="text"
              value={inpval.hct}
              onChange={setdata}
              name="hct"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              MCV
            </label>
            <input
              type="text"
              value={inpval.mcv}
              onChange={setdata}
              name="mcv"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              MCH
            </label>
            <input
              type="text"
              value={inpval.mch}
              onChange={setdata}
              name="mch"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              MCHC
            </label>
            <input
              type="text"
              value={inpval.mchc}
              onChange={setdata}
              name="mchc"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              RDW-CV
            </label>
            <input
              type="text"
              value={inpval.rdwcv}
              onChange={setdata}
              name="rdwcv"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              RDW-SD
            </label>
            <input
              type="text"
              value={inpval.rdwsd}
              onChange={setdata}
              name="rdwsd"
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

export default RepRegister;
