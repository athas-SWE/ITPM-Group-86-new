import { useState, useEffect } from "react";
import Axios from "axios";
// import { useForm } from "react-hook-form";
// import Header from "../../header.js";
//import DocsModel from '../../server/models/docs';
//import axios from 'axios';
//import { TextField } from '@material-ui/core';
//import DocsModel from '../../server/models/docs';
//import { Input } from "antd";
import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {appValSchema} from "../Validations/AppointmentValidation";

function DoctorsDatabase() {
  /*
    const [listOfDocs, setListOfDocs] = useState([]);
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [NIC, setNIC] = useState("")
    const [address, setAddress] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [shift, setShift] = useState("")
    const [availability, setAvailability] = useState("")
    */

  //get request
  const [listOfDocs, setListOfDocs] = useState([]);
  // const [listOfPatients, setListOfPatients] = useState([]);
  const [patientNo, setPatientNo] = useState(0);
  const [name, setName] = useState("");
  const [DOB, setDOB] = useState("");
  const [wardID, setWardID] = useState("");
  const [sugar, setSugar] = useState(0);
  const [cholesterol, setCholesterol] = useState(0);
  const [hct, setHct] = useState(0);
  const [mcv, setMcv] = useState(0);
  const [mch, setMch] = useState(0);
  const [mchc, setMchc] = useState(0);
  const [rdwcv, setRdwcv] = useState(0);
  const [rdwsd, setRdwsd] = useState(0);

  const [error, setError] = useState("");

  //validation
  const Dschema = yup.object().shape({
    /*
        age: yup.number().required(),
        name: yup.string().required("Name is required"),
        NIC: yup.string().min(8, "Min characters are 8").max(13, "Max characters  12").required("NIC is required"),
        address: yup.string().required(),
        specialization: yup.string().required(),
        shift: yup.string().max(6).required(),
        availability: yup.string().required(),
        */

    patientNo: yup.string().required(),
    name: yup.string().required("Name is required"),
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

  // const addDocs = () => {
  //   Axios.post("https://hospital-run.herokuapp.com/addDocs",{
  //     name,
  //     age,
  //     NIC,
  //     address,
  //     specialization,
  //     shift,
  //     availability,
  //   }).then((response) => {
  //     alert("USER CREATED");
  //     Axios.get("https://hospital-run.herokuapp.com/getDocs").then((response) => {
  //     setListOfDocs (response.data)
  //     setCurrentDocs(response.data.map((docs,index) => { return <Doctor
  //       key={index}
  //       age={docs.age}
  //       name={docs.name}
  //       NIC={docs.NIC}
  //       address={docs.address}
  //       specialization={docs.specialization}
  //       shift={docs.shift}
  //       availability={docs.availability}
  //       id={docs._id}
  //      />}));
  //   });
  //   });

  // };

  const [currentDocs, setCurrentDocs] = useState([]);

  //const [currentPatients, setCurrentPatients] = useState([]);

  const search = (query) => {
    let filtered = listOfDocs.filter((doc) => {
      if (query === "") {
        return doc;
      } else if (doc.name.toLowerCase().includes(query.toLowerCase())) {
        return doc;
      }
    });
    filtered = filtered.map((pat, index) => {
      return (
        <Doctor
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
    setCurrentDocs(filtered);
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/Health_info/getDocs").then((response) => {
      setListOfDocs(response.data);
      setCurrentDocs(
        response.data.map((pat, index) => {
          return (
            <Doctor
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
              // action={<button>Edit</button>}
            />
          );
        })
      );
    });
  }, []);

  const createDOCS = async (event, document) => {
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

    if (isValid) {
      // const addDocs = () => {
      Axios.post("http://localhost:5000/Health_info/addDocs", {
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
      }).then((response) => {
        alert("USER CREATED");
        Axios.get("http://localhost:5000/Health_info/getDocs").then(
          (response) => {
            setListOfDocs(response.data);
            setCurrentDocs(
              response.data.map((pat, index) => {
                return (
                  <Doctor
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
              })
            );
          }
        );
      });
    } else setError("Incorrect inputs");

    // };
  };
  return (
    <div className="App">
      {/* <Header /> */}
      <div className="flex-container">
        <hr></hr>
        <h1>Doctor Details</h1>
        <div className="instascroll" id="section 1">
          <a href="#section_2">Click Here to add a doc</a>
        </div>
        <div className="flex-child searchBar">
          <input
            className="searchBar input"
            placeholder="search...."
            onChange={(event) => search(event.target.value)}
          />
        </div>
        <div className="flex-child docsDisplay">
          {currentDocs.length === 0 ? <p>Nothing here boiii</p> : null}
          <table
            className="table1"
            style={{ display: currentDocs.length === 0 ? "none" : "" }}
          >
            <thead>
              <tr>
                <th>patientNo</th>
                <th>name</th>
                <th>DOB</th>
                <th>wardID</th>
                <th>sugar</th>
                <th>cholesterol</th>
              </tr>
            </thead>
            <tbody>{currentDocs}</tbody>
          </table>
        </div>
      </div>

      {/* <div className='instaScroll' id="section_2"> */}
      <hr></hr>
      <h2>Enter Doctor Details</h2>

      {/* <div className='adddocs' id="section_2"> */}
      <form onSubmit={createDOCS} className="adddocs" id="section_2">
        {/* <button onClick= {addDocs}>add docs</button> */}
        <div className="divideLeft">
          <input
            type="text"
            placeholder="patientNo.."
            required="required"
            onChange={(event) => {
              setPatientNo(event.target.value);
            }}
          />

          <input
            type="text"
            placeholder="name.."
            required="required"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <input
            type="date"
            placeholder="DOB.."
            required="required"
            onChange={(event) => {
              setDOB(event.target.value);
            }}
          />

          <input
            type="number"
            placeholder="ward-ID.."
            required="required"
            onChange={(event) => {
              setWardID(event.target.value);
            }}
          />

          <input
            type="number"
            placeholder="sugar.."
            required="required"
            onChange={(event) => {
              setSugar(event.target.value);
            }}
          />

          <input
            type="number"
            placeholder="cholesterol.."
            required="required"
            onChange={(event) => {
              setCholesterol(event.target.value);
            }}
          />
          {/* <p>{errors.address?.message}</p> */}
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

          <input
            type="number"
            placeholder="MCV.."
            required="required"
            onChange={(event) => {
              setMcv(event.target.value);
            }}
          />

          <input
            type="number"
            placeholder="MCH.."
            required="required"
            onChange={(event) => {
              setMch(event.target.value);
            }}
          />

          <input
            type="number"
            placeholder="MCHC.."
            required="required"
            onChange={(event) => {
              setMchc(event.target.value);
            }}
          />

          <input
            type="number"
            placeholder="RDWCV.."
            required="required"
            onChange={(event) => {
              setRdwcv(event.target.value);
            }}
          />

          <input
            type="number"
            placeholder="RDWSD.."
            required="required"
            onChange={(event) => {
              setRdwsd(event.target.value);
            }}
          />
          {/* <p>{errors.availability?.message}</p> */}

          <button type="submit"> add doctor </button>
          {/* </div> */}
        </div>
      </form>
      <span className="error-msg">{error}</span>
      {/* </div>  */}
    </div>
  );
}

function Doctor(props) {
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

  const updateSchema = yup.object().shape({
    patientNo: yup.string().required("Name is required"),
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
  const update = async (event) => {
    event.preventDefault();
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
    let formdata = {
      NewpatientNo: event.target[0].value,
      Newname: event.target[1].value,
      NewDOB: event.target[2].value,
      NewwardID: event.target[3].value,
      Newsugar: event.target[4].value,
      Newcholesterol: event.target[5].value,
      Newhct: event.target[6].value,
      Newmcv: event.target[7].value,
      Newmch: event.target[8].value,
      Newmchc: event.target[9].value,
      Newrdwcv: event.target[10].value,
      Newrdwsd: event.target[11].value,
    };

    const isValid = await updateSchema.isValid(formdata);

    if (isValid) {
      Axios.post("http://localhost:5000/Health_info/updateAge", {
        NewpatientNo: patientNo,
        Newname: name,
        NewDOB: DOB,
        NewwardID: wardID,
        Newsugar: sugar,
        Newcholesterol: cholesterol,
        Newhct: hct,
        Newmcv: mcv,
        Newmch: mch,
        Newmchc: mchc,
        Newrdwcv: rdwcv,
        Newrdwsd: rdwsd,
        id: props.id,
      })
        .then(() => {
          alert("Done boii");
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const deletedocs = () => {
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
    Axios.post(`http://localhost:5000/Doctor/delete/deletedoc/:id`, {
      id: props.id,
    })
      .then((response) => {
        alert("deleted");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  //adjust this shit

  // const [show, setShow] = useState(false);
  return (
    <tr>
      {/* <td><button onClick={() => setShow(currentShow => !currentShow)}>dhkshjhdkajhdjk  </button></td>
      { show ? <Doctor/> : null } */}
      <td>
        <div>
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
      <td>
        <div>
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
      <td>
        <div>
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
      <td>
        <div>
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
      <td>
        <div>
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
      <td>
        <div>
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

      <td>
        <button onClick={update}>update</button>{" "}
        <button onClick={deletedocs}>delete</button>
      </td>
    </tr>

    // </div>
  );
}

export default DoctorsDatabase;
