const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const patientSchema = new mongoose.Schema({

  bookingNo: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true, //backend validation
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  nic: {
    type: Number,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  wardID: {
    type: String,
    required: true,
  },
  visitorNo: {
    type: Number,
    required: true,
  },
});

const Patient = new mongoose.model("Patient", patientSchema);
module.exports = Patient;


