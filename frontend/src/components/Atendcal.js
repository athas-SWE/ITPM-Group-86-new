import React from "react";
import "./attendance.css";

export default class Salarcal extends React.Component {
  state = { BasicSalary: "", Allowence: "", LeaveDays: "", Salary: "" };
  constructor(props) {
    super(props);
    this.state = { BasicSalary: "", Allowence: "", LeaveDays: "", Salary: "" };
  }

  exe1() {
    console.log(
      "BasicSalary: ",
      this.state.BasicSalary,
      " + Allowence: ",
      " - LeaveDays: ",
      this.state.Allowence
    );
    this.setState({
      Salary:
        (parseInt(this.state.BasicSalary) / parseInt(this.state.Allowence)) *
        100,
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="containerC">
        <div className="mainContainer">
          <h1 className="inn">Attendance Percentage Checker</h1>

          <h3>Number of days a student is Present</h3>
          <input
            type="text"
            className="inputStyle"
            value={this.state.BasicSalary}
            onChange={(eve) => {
              this.setState({ BasicSalary: eve.target.value });
            }}
          />
          <br />
          <br />

          <h3>Total Number of days of Attendance </h3>
          <input
            type="text"
            className="inputStyle"
            value={this.state.Allowence}
            onChange={(eve) => {
              this.setState({ Allowence: eve.target.value });
            }}
          />
          <br />
          <br />

          {/* <h3>student take the LeaveDays </h3>
          <p></p>

          <input
            type="text"
            className="inputStyle"
            value={this.state.LeaveDays}
            onChange={(eve) => {
              this.setState({ LeaveDays: eve.target.value });
            }}
          />
          <br />
          <br /> */}

          <button
            className="btn btn-warning"
            onClick={() => {
              this.exe1();
            }}
          >
            Calculate the attendance percentage
          </button>
          <br />
          <br />

          <input type="text" className="outStyle" value={this.state.Salary} />

          <br />
          <br />
        </div>
      </div>
    );
  }
}
