const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const nurseSchema = new Scheme({
  nurseID: {
    type: String,
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
  phoneNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  wardID: {
    type: String,
    required: true,
  },
});

const Nurse = new mongoose.model("Nurse", nurseSchema);
module.exports = Nurse;
