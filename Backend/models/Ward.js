const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const wardSchema = new mongoose.Schema({

  wardID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true, //backend validation
  },
  ICU: {
    type: Number,
    required: true,
  },
  Normal: {
    type: Number,
    required: true,
  },
  TotNoOfPatients: {
    type: Number,
  },
  TotNoOfDoctors: {
    type: Number,
    required: true,
  },
  TotNoOfNurse: {
    type: Number,
    required: true,
  }
});

const Ward = new mongoose.model("Ward", wardSchema);
module.exports = Ward;
