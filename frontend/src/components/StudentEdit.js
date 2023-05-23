import React, { useState, useEffect, useContext } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { updatedata } from "./Context/ContextProvider";

const VisEdit = () => {
  //const [getuserdata, setuserdata] = useState([]);
  //console.log(getuserdata);

  const { updata, setUPdata } = useContext(updatedata);

  const history = useHistory("");

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

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`http://localhost:5000/Visitor/getuser/${id}`, {
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

    const res2 = await fetch(`http://localhost:5000/Visitor/updateuser/${id}`, {
      method: "PATCH",
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

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      history.push("/visitorF");
      setUPdata(data2);
    } else {
      alert("Fill the data");
    }
  };

  return (
    <div className="container">
      <button className="Back_btn mt-2 mb-5">
        <NavLink className="back" to="/visitorF">
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
              value={inpval.visitorNo}
              onChange={setdata}
              name="visitorNo"
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
              value={inpval.name}
              onChange={setdata}
              name="name"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Teacher Name
            </label>
            <input
              type="number"
              value={inpval.age}
              onChange={setdata}
              name="age"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Location
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
              Building
            </label>
            <input
              type="mobile number"
              value={inpval.nic}
              onChange={setdata}
              name="nic"
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

export default VisEdit;
