const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const healthSchema = new mongoose.Schema({

  patientNo: {   //BookingNO
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    Required: true,
  },
  wardID: {
    type: String,
    required: true, //backend validation
  },
  sugar: {
    type: Number
  },
  cholesterol: {
    type: Number
  },
  hct: {
    type: Number
  },
  mcv: {
    type: Number
  },
  mch: {
    type: Number
  },
  mchc: {
    type: Number
  },
  rdwcv: {
    type: Number
  },
  rdwsd: {
    type: Number
  },
});

const Health_info = new mongoose.model("Health_info", healthSchema);
module.exports = Health_info;



/*
const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const health_infoSchema = new Scheme({
  patientID: {
    type: Number
  },
  wardID: {
    type: String,
    required: true, //backend validation
  },
  pressure: {
    type: String,
    required: true,
  },
  sugar: {
    type: String,
    required: true,
  },
  pulse: {
    type: Number,
    required: true,
  },
});

const Health_info = mongoose.model("Health_info", health_infoSchema);
module.exports = Health_info;
*/