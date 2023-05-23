const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const pdf = require('html-pdf');

const Doctor = require("./models/Doctor");
const Nurse = require("./models/Nurse");
const Register = require("./models/Register");
const Patient = require("./models/Patient");
const Health_info = require("./models/Health_info");
const Visitor = require("./models/Visitor");
const Ward = require("./models/Ward");

const pdfTemplate = require('./documents');



require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Start the server
//define the port for server
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});

const doctorRouter = require("./routes/Doctors.js");
const nurseRouter = require("./routes/Nurses.js");
const userRouter = require("./routes/Registers.js");
const patientRouter = require("./routes/Patients.js");
const healthRouter = require("./routes/Health_information.js");
const visitorRouter = require("./routes/Visitors.js");
const wardRouter = require("./routes/Wards.js");

//const reportRouter = require("./routes/ReportG.js");

app.use("/Doctor", doctorRouter);
app.use("/Nurse", nurseRouter);
app.use("/Register", userRouter);
app.use("/Patient", patientRouter);
app.use("/Health_info", healthRouter);
app.use("/Visitor", visitorRouter);
app.use("/Ward", wardRouter);

//Report Genarate
app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});

app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`)
})


app.listen(port, () => {
  console.log("Server is starting on port " + port);
});
