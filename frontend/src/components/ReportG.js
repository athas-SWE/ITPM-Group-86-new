import React, { Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

class ReportG extends Component {
  state = {
    name: "",
    patientId: 0,
    wardId: 0,
    sugar: 0,
    cholesterol: 0,
    RBC: 0,
    FBS: 0,
    HDL: 0,
    LDL: 0,
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  createAndDownloadPdf = () => {
    axios
      .post("/create-pdf", this.state)
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  render() {
    return (
      <div className="Report">
        <center>
          <div className="welcome">
            <h3>Welcome to SYS ACADEMY</h3>
          </div>
        </center>
        <div className="homepage2">
          <div className="button">
            <a href="/home">Dashboard</a>
          </div>
        </div>
        <div className="ReportTable">
          <center>
            <br></br>
            <h1 className="MReport"> Report</h1>
            <br></br>
            <div className="patientD">
              <input
                type="text"
                placeholder="Patient Name"
                name="name"
                onChange={this.handleChange}
              />
              <br></br>
              <br></br>
              <input
                type="number"
                placeholder="Patient ID"
                name="patientId"
                onChange={this.handleChange}
              />
              <br></br>
              <br></br>
              <input
                type="number"
                placeholder="Ward ID 1"
                name="wardId"
                onChange={this.handleChange}
              />
              <br></br>
              <br></br>
            </div>
            <br></br>
            <div className="patientR">
              <input
                type="number"
                placeholder="Sugar %"
                name="sugar"
                onChange={this.handleChange}
              />
              <span> </span>
              <input
                type="number"
                placeholder="Cholesterol %"
                name="cholesterol"
                onChange={this.handleChange}
              />
              <span> </span>
              <input
                type="number"
                placeholder="RBC %"
                name="RBC"
                onChange={this.handleChange}
              />
              <span> </span>
              <input
                type="number"
                placeholder="FBS %"
                name="FBS"
                onChange={this.handleChange}
              />
              <span> </span>
              <input
                type="number"
                placeholder="HDL %"
                name="HDL"
                onChange={this.handleChange}
              />
              <span> </span>
              <input
                type="number"
                placeholder="LDL %"
                name="LDL"
                onChange={this.handleChange}
              />
              <br></br>
              <br></br>
              <button onClick={this.createAndDownloadPdf}>Download PDF</button>
              <br></br>
              <br></br>
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default ReportG;
