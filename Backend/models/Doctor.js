const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const doctorSchema = new mongoose.Schema({
  doctorID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,

  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  specialist: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  wardID: {
    type: String,
    required: true,
  }
});

const Doctor = new mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;

/*
const doctorSchema = new Scheme({
  doctorID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true, //backend validation
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  specialist: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String

  },
  email: {
    type: String
  },
  wardID: {
    type: String,
    required: true,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
*/