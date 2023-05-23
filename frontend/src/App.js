import "./App.css";
import DocRegister from "./components/TeacherRegister";
import DoctorF from "./components/TeacherF";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import DocEdit from "./components/TeacherEdit";
import DocDetails from "./components/TeacherDetails";
import Home from "./components/Home";

import DateTime from "./components/DateTime";

import NurseF from "./components/ParentF";
import NurRegister from "./components/ParentRegister";
import NurEdit from "./components/ParentEdit";
import NurDetails from "./components/ParentDetails";

import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";

import cal from "./components/Atendcal";

import PatientF from "./components/StudentF";
import PatientRegister from "./components/StudentRegister";
import PatientEdit from "./components/StudentEdit";
import PatientDetails from "./components/StudentDetails";

import VisitorF from "./components/ClassF";
import VisRegister from "./components/ClassRegister";
import VisEdit from "./components/ClassEdit";
import VisDetails from "./components/ClassDetails";

import WardF from "./components/AttendanceF";
import WardRegister from "./components/AttendanceRegister";
import WardEdit from "./components/AttendanceEdit";
import WardDetails from "./components/AttendanceDetails";

import ReportF from "./components/ReportF";
import RepRegister from "./components/RepRegister";
import RepEdit from "./components/RepEdit";
import RepDetails from "./components/RepDetails";

import Medicine from "./components/Feedback";
import ReportG from "./components/ReportG";
import PatientReport from "./components/PatientReport";
import MedicalReport from "./components/StudentReport";

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <>
      <Header />
      <DateTime />

      <Switch>
        <Route exact path="/doctorF" component={DoctorF} />
        <Route exact path="/docregister" component={DocRegister} />
        <Route exact path="/doctorEdit/:id" component={DocEdit} />
        <Route exact path="/doctorView/:id" component={DocDetails} />

        <Route exact path="/home" component={Home} />

        <Route exact path="/nurseF" component={NurseF} />
        <Route exact path="/NurRegister" component={NurRegister} />
        <Route exact path="/NurseEdit/:id" component={NurEdit} />
        <Route exact path="/NurseView/:id" component={NurDetails} />

        <Route exact path="/patientF" component={PatientF} />
        <Route exact path="/patientRegister" component={PatientRegister} />
        <Route exact path="/patientEdit/:id" component={PatientEdit} />
        <Route exact path="/patientView/:id" component={PatientDetails} />

        <Route exact path="/visitorF" component={VisitorF} />
        <Route exact path="/visitorRegister" component={VisRegister} />
        <Route exact path="/visitorEdit/:id" component={VisEdit} />
        <Route exact path="/visitorView/:id" component={VisDetails} />

        <Route exact path="/wardF" component={WardF} />
        <Route exact path="/wardRegister" component={WardRegister} />
        <Route exact path="/wardEdit/:id" component={WardEdit} />
        <Route exact path="/wardView/:id" component={WardDetails} />

        <Route exact path="/reportF" component={ReportF} />
        <Route exact path="/repRegister" component={RepRegister} />
        <Route exact path="/repEdit/:id" component={RepEdit} />
        <Route exact path="/repView/:id" component={RepDetails} />

        <Route exact path="/medicine" component={Medicine} />
        <Route exact path="/reportG" component={ReportG} />

        <Route exact path="/PatientReport" component={PatientReport} />
        <Route exact path="/MedicalReport" component={MedicalReport} />

        <Route exact path="/home1">
          {user && user._id ? (
            <Home setLoginUser={setLoginUser} />
          ) : (
            <Login setLoginUser={setLoginUser} />
          )}
        </Route>

        <Route exact path="/" component={Login}>
          <Login setLoginUser={setLoginUser} />
        </Route>

        <Route exact path="/register" component={Register} />
      </Switch>
    </>
  );
}

export default App;
