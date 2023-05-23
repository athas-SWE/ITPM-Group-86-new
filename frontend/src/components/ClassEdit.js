import React, { useState, useEffect, useContext } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { updatedata } from "./Context/ContextProvider";

const ClassEdit = () => {
  //const [getuserdata, setuserdata] = useState([]);
  //console.log(getuserdata);

  const { updata, setUPdata } = useContext(updatedata);

  const history = useHistory("");

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

  const { id } = useParams("");
  console.log(id);

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
      setINP(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
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

    const res2 = await fetch(`http://localhost:5000/Ward/updateuser/${id}`, {
      method: "PATCH",
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

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      history.push("/wardF");
      setUPdata(data2);
    } else {
      alert("Fill the data");
    }
  };

  return (
    <div className="container">
      <button className="Back_btn mt-2 mb-5">
        <NavLink className="back" to="/wardF">
          Back
        </NavLink>
      </button>

      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Class ID
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
              Teacher Name
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
              Student Total
            </label>
            <input
              type="number"
              value={inpval.ICU}
              onChange={setdata}
              name="ICU"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Teacher ID
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
              Building
            </label>
            <input
              type="mobile number"
              value={inpval.TotNoOfPatients}
              onChange={setdata}
              name="TotNoOfPatients"
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

export default ClassEdit;
