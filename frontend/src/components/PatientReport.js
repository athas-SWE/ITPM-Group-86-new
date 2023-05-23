//import './patients.css';
import { useEffect, useState } from "react";
import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Axios from "axios";
import { adddata } from "./Context/ContextProvider";

import img9 from "./image/Report.png";

import * as yup from "yup";

import jsPDF from "jspdf";
import "jspdf-autotable";

function PatientsDB() {
  //get request
  const [listOfPatients, setListOfPatients] = useState([]);
  const [patientNo, setPatientNo] = useState(0);
  const [name, setName] = useState("");
  const [DOB, setDOB] = useState("");
  const [wardID, setWardID] = useState("");

  const { udata, setUdata } = useContext(adddata);

  const [sugar, setSugar] = useState(0);
  const [cholesterol, setCholesterol] = useState(0);
  const [hct, setHct] = useState(0);
  const [mcv, setMcv] = useState(0);
  const [mch, setMch] = useState(0);
  const [mchc, setMchc] = useState(0);
  const [rdwcv, setRdwcv] = useState(0);
  const [rdwsd, setRdwsd] = useState(0);
  const [currentPatients, setCurrentPatients] = useState([]);

  const [error, setError] = useState("");

  // Validations
  const Dschema = yup.object().shape({
    patientNo: yup.string().required(),
    name: yup.string().required(),
    DOB: yup.date().default(() => new DOB()).required,
    wardID: yup.string().required(),

    sugar: yup.number().max(3).positive().integer().required(),
    cholesterol: yup.number().max(3).positive().integer().required(),
    hct: yup.number().max(3).positive().integer().required(),
    mcv: yup.number().max(3).positive().integer().required(),
    mch: yup.number().max(3).positive().integer().required(),
    mchc: yup.number().max(3).positive().integer().required(),
    rdwcv: yup.number().max(3).positive().integer().required(),
    rdwsd: yup.number().max(3).positive().integer().required(),
  });

  const addPatients = async (event) => {
    event.preventDefault();
    let formdata = {
      patientNo: event.target[0].value,
      name: event.target[1].value,
      DOB: event.target[2].value,
      wardID: event.target[3].value,
      sugar: event.target[4].value,
      cholesterol: event.target[5].value,
      hct: event.target[6].value,
      mcv: event.target[7].value,
      mch: event.target[8].value,
      mchc: event.target[9].value,
      rdwcv: event.target[10].value,
      rdwsd: event.target[11].value,
    };
    const isValid = await Dschema.isValid(formdata);

    console.table({
      patientNo: patientNo,
      name: name,
      DOB: DOB,
      wardID: wardID,
      sugar: sugar,
      cholesterol: cholesterol,
      hct: hct,
      mcv: mcv,
      mch: mch,
      mchc: mchc,
      rdwcv: rdwcv,
      rdwsd: rdwsd,
    });
    if (isValid) {
      Axios.post("http://localhost:5000/Health_info/add", {
        patientNo: patientNo,
        name: name,
        DOB: DOB,
        wardID: wardID,
        sugar: sugar,
        cholesterol: cholesterol,
        hct: hct,
        mcv: mcv,
        mch: mch,
        mchc: mchc,
        rdwcv: rdwcv,
        rdwsd: rdwsd,
      })
        .then((response) => {
          alert("Report Added");
          setListOfPatients([
            ...listOfPatients,
            {
              patientNo,
              name,
              DOB,
              wardID,
              sugar,
              cholesterol,
              hct,
              mcv,
              mch,
              mchc,
              rdwcv,
              rdwsd,
            },
          ]);
        })
        .catch((e) => {
          console.error(e);
        });
    } else setError("Incorrect inputs");
  };

  /*
        const history = useHistory();
    
        const [inpval, setINP] = useState({
    
            patientNo: "",
            name: "",
            DOB: "",
            wardID: "",
            sugar: "",
            cholesterol: "",
            hct: "",
            mcv: "",
            mch: "",
            mchc: "",
            rdwcv: "",
            rdwsd: "",
    
        })
    
        const setdata = (e) => {
            console.log(e.target.value);
            const { name, value } = e.target;
            setINP((preval) => {
                return {
                    ...preval,
                    [name]: value
                }
            })
        }
    
        const addinpdata = async (e) => {
            e.preventDefault();
            const {
                patientNo,
                name,
                DOB,
                wardID,
                sugar,
                cholesterol,
                hct,
                mcv,
                mch,
                mchc,
                rdwcv,
                rdwsd,
            } = inpval;
    
    
            const res = await fetch("http://localhost:5000/Health_info/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    patientNo,
                    name,
                    DOB,
                    wardID,
                    sugar,
                    cholesterol,
                    hct,
                    mcv,
                    mch,
                    mchc,
                    rdwcv,
                    rdwsd,
                })
            });
    
            const data = await res.json();
            console.log(data);
    
            if (res.status === 422 || !data) {
                console.log("error");
                alert("error");
            } else {
                history.push("/PatientReport");
                console.log("data added");
                alert("Data added");
                setdata();
                setUdata(data);
            }
        }
    */

  /*Search */

  const search = (query) => {
    let filtered = listOfPatients.filter((pat) => {
      if (query === "") {
        return pat;
      } else if (pat.name.toLowerCase().includes(query.toLowerCase())) {
        return pat;
      }
    });
    filtered = filtered.map((pat, index) => {
      return (
        <Patients
          key={index}
          patientNo={pat.patientNo}
          name={pat.name}
          DOB={pat.DOB}
          wardID={pat.wardID}
          sugar={pat.sugar}
          cholesterol={pat.cholesterol}
          hct={pat.hct}
          mcv={pat.mcv}
          mch={pat.mch}
          mchc={pat.mchc}
          rdwcv={pat.rdwcv}
          rdwsd={pat.rdwsd}
          id={pat._id}
        />
      );
    });
    setCurrentPatients(filtered);
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/Health_info/").then((response) => {
      setListOfPatients(response.data);
      setCurrentPatients(
        response.data.map((pat, index) => {
          return (
            <Patients
              DOB={new Date(pat.DOB).toLocaleDateString()}
              key={index}
              patientNo={pat.patientNo}
              name={pat.name}
              wardID={pat.wardID}
              sugar={pat.sugar}
              cholesterol={pat.cholesterol}
              hct={pat.hct}
              mcv={pat.mcv}
              mch={pat.mch}
              mchc={pat.mchc}
              rdwcv={pat.rdwcv}
              rdwsd={pat.rdwsd}
              id={pat._id}
            />
          );
        })
      );
    });
    Axios.get("http://localhost:5000/Health_info/").then((response) => {
      console.log(listOfPatients);

      setListOfPatients(response.data);
      setCurrentPatients(
        response.data.map((pat, index) => {
          return (
            <Patients
              DOB={new Date(pat.DOB).toLocaleDateString()}
              key={index}
              patientNo={pat.patientNo}
              name={pat.name}
              wardID={pat.wardID}
              sugar={pat.sugar}
              cholesterol={pat.cholesterol}
              hct={pat.hct}
              mcv={pat.mcv}
              mch={pat.mch}
              mchc={pat.mchc}
              rdwcv={pat.rdwcv}
              rdwsd={pat.rdwsd}
              id={pat._id}
            />
          );
        })
      );
    });
  }, []);

  const genPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });
    doc.setFontSize(20);
    doc.text(
      "JMH                                                    Patient Medical Report",
      10,
      10
    );

    doc.autoTable({
      html: "#content",
    });
    doc.save("Medical Report.pdf");
  };

  return (
    <div className="patients">
      <center>
        <div className="flex-container1">
          <div className="homepage2">
            <div className="button">
              <a href="/home">Dashboard</a>
            </div>
            <center>
              <div className="welcome">
                <h3>Welcome to Jameel Memorial hospital - JMH</h3>
              </div>
            </center>
          </div>
          <h1>
            Patient Report
            <img
              className="logo img mt-4"
              src={img9}
              style={{ width: 100 }}
              alt="profile"
            />
          </h1>
          <div className="flex-child searchBar">
            <input
              placeholder="search...."
              onChange={(event) => search(event.target.value)}
            />
          </div>
          <div className="instascroll" id="section 1">
            <button>
              <a href="#section_2"> Add a patient report</a>
            </button>
          </div>
          <div className="PRPDF-btn">
            <button
              onClick={genPDF}
              type="button"
              data-modal-toggle="delete-user-modal"
              className="Report-Button"
            >
              Downlord Report
            </button>
          </div>

          <div className="flex-child docsDisplay">
            {currentPatients.length === 0 ? (
              <p>No patients in that name</p>
            ) : null}
            <table
              className="table1"
              id="content"
              style={{ display: currentPatients.length === 0 ? "none" : "" }}
            >
              <thead>
                <tr>
                  <th>patientNo</th>
                  <span> </span>
                  <th>name</th>
                  <span> </span>
                  <th>DOB</th>
                  <span> </span>
                  <th>wardID</th>
                  <span> </span>
                  <th>sugar</th>
                  <span> </span>
                  <th>cholesterol</th>
                  <span></span>

                  {/* <th >hct</th>
                                 <th >mcv</th>
                                <th >mch</th>
                                <th >mchc</th>
                                <th >rdwcv</th>
                                <th >rdwsd</th> */}
                </tr>
              </thead>
              <tbody>{currentPatients}</tbody>
            </table>
          </div>
        </div>

        <hr></hr>
        <h2 className="ptient-Details">Enter Patient Details</h2>
        <form onSubmit={addPatients} className="addpatients" id="section_2">
          <div className="divideLeft">
            <input
              type="text"
              placeholder="patientNo.."
              required="required"
              onChange={(event) => {
                setPatientNo(event.target.value);
              }}
            />
            <br></br>
            <br></br>

            <input
              type="text"
              placeholder="name.."
              required="required"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <br></br>
            <br></br>
            <input
              type="date"
              placeholder="DOB.."
              required="required"
              onChange={(event) => {
                setDOB(event.target.value);
              }}
            />
            <br></br>
            <br></br>
            <input
              type="number"
              placeholder="ward-ID.."
              required="required"
              onChange={(event) => {
                setWardID(event.target.value);
              }}
            />
            <br></br>
            <br></br>

            <input
              type="number"
              placeholder="sugar.."
              required="required"
              onChange={(event) => {
                setSugar(event.target.value);
              }}
            />
            <br></br>
            <br></br>

            <input
              type="number"
              placeholder="cholesterol.."
              required="required"
              onChange={(event) => {
                setCholesterol(event.target.value);
              }}
            />
            <br></br>
            <br></br>
          </div>
          <div className="divideRight">
            <input
              type="number"
              placeholder="HCT.."
              required="required"
              onChange={(event) => {
                setHct(event.target.value);
              }}
            />
            <br></br>
            <br></br>

            <input
              type="number"
              placeholder="MCV.."
              required="required"
              onChange={(event) => {
                setMcv(event.target.value);
              }}
            />
            <br></br>
            <br></br>

            <input
              type="number"
              placeholder="MCH.."
              required="required"
              onChange={(event) => {
                setMch(event.target.value);
              }}
            />
            <br></br>
            <br></br>

            <input
              type="number"
              placeholder="MCHC.."
              required="required"
              onChange={(event) => {
                setMchc(event.target.value);
              }}
            />
            <br></br>
            <br></br>

            <input
              type="number"
              placeholder="RDWCV.."
              required="required"
              onChange={(event) => {
                setRdwcv(event.target.value);
              }}
            />
            <br></br>
            <br></br>

            <input
              type="number"
              placeholder="RDWSD.."
              required="required"
              onChange={(event) => {
                setRdwsd(event.target.value);
              }}
            />
            <br></br>
            <br></br>
          </div>
          <button type="submit" onSubmit={addPatients}>
            {" "}
            Add Report{" "}
          </button>
        </form>
        <span className="error-msg">{error}</span>
      </center>
    </div>
  );
}

function Patients(props) {
  const [patientNo, setPatientNo] = useState(props.patientNo);
  const [name, setName] = useState(props.name);
  const [DOB, setDOB] = useState(props.DOB);
  const [wardID, setWardID] = useState(props.wardID);
  const [sugar, setSugar] = useState(props.sugar);
  const [cholesterol, setCholesterol] = useState(props.cholesterol);
  const [hct, setHct] = useState(props.hct);
  const [mcv, setMcv] = useState(props.mcv);
  const [mch, setMch] = useState(props.mch);
  const [mchc, setMchc] = useState(props.mchc);
  const [rdwcv, setRdwcv] = useState(props.rdwcv);
  const [rdwsd, setRdwsd] = useState(props.rdwsd);

  const update = () => {
    console.table({
      patientNo: patientNo,
      name: name,
      DOB: DOB,
      wardID: wardID,
      sugar: sugar,
      cholesterol: cholesterol,
      hct: hct,
      mcv: mcv,
      mch: mch,
      mchc: mchc,
      rdwcv: rdwcv,
      rdwsd: rdwsd,
    });

    Axios.post(`http://localhost:5000/Doctor/updateuser/${props.id}`, {
      patientNo: patientNo,
      name: name,
      DOB: DOB,
      wardID: wardID,
      sugar: sugar,
      cholesterol: cholesterol,
      hct: hct,
      mcv: mcv,
      mch: mch,
      mchc: mchc,
      rdwcv: rdwcv,
      rdwsd: rdwsd,
      id: props.id,
    })
      .then(() => {
        console.log("successfully updated");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const deletePatients = () => {
    console.table({
      patientNo: patientNo,
      name: name,
      DOB: DOB,
      wardID: wardID,
      sugar: sugar,
      cholesterol: cholesterol,
      hct: hct,
      mcv: mcv,
      mch: mch,
      mchc: mchc,
      rdwcv: rdwcv,
      rdwsd: rdwsd,
    });

    Axios.post(`http://localhost:5000/Doctor/delete/${props.id}`)
      .then(() => {
        console.log("deleted");
      })

      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <tr>
      {/* <td>{props.id}</td> */}

      <td>
        <div className="input-data1">
          {" "}
          {props.patientNo} <br></br>
          <input
            type="text"
            onInput={(e) => {
              setPatientNo(e.target.value);
            }}
            value={patientNo}
          ></input>
        </div>
      </td>
      <span> </span>
      <td>
        <div className="input-data1">
          {" "}
          {props.name} <br></br>
          <input
            type="text"
            onInput={(e) => {
              setName(e.target.value);
            }}
            value={name}
          ></input>
        </div>
      </td>
      <span> </span>
      <td>
        <div className="input-data1">
          {" "}
          {props.DOB} <br></br>
          <input
            type="date"
            onInput={(e) => {
              setDOB(e.target.value);
            }}
            value={DOB}
          ></input>
        </div>
      </td>
      <span> </span>
      <td>
        <div className="input-data1">
          {props.wardID}
          <br></br>{" "}
          <input
            type="text"
            onInput={(e) => {
              setWardID(e.target.value);
            }}
            value={wardID}
          ></input>
        </div>
      </td>
      <span> </span>
      <td>
        <div className="input-data1">
          {" "}
          {props.sugar} <br></br>
          <input
            type="number"
            onInput={(e) => {
              setSugar(e.target.value);
            }}
            value={sugar}
          ></input>
        </div>
      </td>
      <span> </span>
      <td>
        <div className="input-data1">
          {" "}
          {props.cholesterol} <br></br>
          <input
            type="number"
            onInput={(e) => {
              setCholesterol(e.target.value);
            }}
            value={cholesterol}
          ></input>
        </div>
      </td>
      {/* <td><div> {props.hct} <input type="number" onInput={(e) => { setHct(e.target.value) }} value={hct}></input></div></td>
            <td><div> {props.mcv} <input type="number" onInput={(e) => { setMcv(e.target.value) }} value={mcv}></input></div></td>
            <td><div> {props.mch} <input type="number" onInput={(e) => { setMch(e.target.value) }} value={mch}></input></div></td>
            <td><div> {props.mchc} <input type="number" onInput={(e) => { setMchc(e.target.value) }} value={mch}></input></div></td>
            <td><div> {props.rdwcv} <input type="number" onInput={(e) => { setRdwcv(e.target.value) }} value={rdwcv}></input></div></td>
            <td><div> {props.rdwsd} <input type="number" onInput={(e) => { setRdwsd(e.target.value) }} value={rdwsd}></input></div></td> */}

      <td>
        <button className="Rbtn1" onClick={deletePatients}>
          delete
        </button>
        <br></br>
        <button className="Rbtn2" onClick={update}>
          update
        </button>
      </td>
    </tr>
  );
}

export default PatientsDB;
