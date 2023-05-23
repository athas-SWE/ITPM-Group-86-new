import React, { useState, useEffect, useContext } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { updatedata } from "./Context/ContextProvider";

const RepEdit = () => {
  //const [getuserdata, setuserdata] = useState([]);
  //console.log(getuserdata);

  const { updata, setUPdata } = useContext(updatedata);

  const history = useHistory("");

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

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`http://localhost:5000/Health_info/getuser/${id}`, {
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
      setINP(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const { patientNo, wardID, rbc, hgb, hct, mcv, mch, mchc, rdwcv, rdwsd } =
      inpval;

    const res2 = await fetch(
      `http://localhost:5000/Health_info/updateuser/${id}`,
      {
        method: "PATCH",
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
      }
    );

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      history.push("/reportF");
      setUPdata(data2);
    } else {
      alert("Fill the data");
    }
  };

  return (
    <div className="container">
      <button className="Back_btn mt-2 mb-5">
        <NavLink className="back" to="/reportF">
          Back
        </NavLink>
      </button>

      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Student ID
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
              Student Name
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
              Grade
            </label>
            <input
              type="number"
              value={inpval.rbc}
              onChange={setdata}
              name="rbc"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Address
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
            <label for="exampleInputPassword1" class="form-label"></label>
            <input
              type="mobile number"
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
              type="mobile number"
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
              type="email"
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
              type="mobile number"
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
          <button type="submit" onClick={updateuser} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RepEdit;
