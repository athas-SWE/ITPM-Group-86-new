const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const visitorSchema = new mongoose.Schema({

    visitorNo: {
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
    nic: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    patientNo: {
        type: Number,
        required: true,
    },
    wardID: {
        type: String,
        required: true,
    }
});

const Visitor = new mongoose.model("Visitor", visitorSchema);
module.exports = Visitor;

