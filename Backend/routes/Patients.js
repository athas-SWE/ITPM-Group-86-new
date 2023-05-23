const router = require("express").Router();
//const Patient = require("../models/Patient");
//const router = express.Router();
let Patient = require("../models/Patient");


//http://localhost:5000/Patient/add
router.post("/add", async (req, res) => {

  const {
    bookingNo,
    name,
    age,
    gender,
    nic,
    phoneNo,
    wardID,
    visitorNo
  } = req.body;

  if (!bookingNo || !name || !age || !gender || !nic || !phoneNo || !wardID || !visitorNo) {
    res.status(422).json("Please fill the data");
  }
  try {
    const preuser = await Patient.findOne({ bookingNo: bookingNo });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("This user is already present");
    } else {
      const adduser = new Patient({
        bookingNo,
        name,
        age,
        gender,
        nic,
        phoneNo,
        wardID,
        visitorNo
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }

  } catch (error) {
    res.status(422).json(error);
  }

})

//http://localhost:5000/Patient/getdata
router.get("/", async (req, res) => {
  try {
    const userdata = await Patient.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);

  }
})

//http://localhost:5000/Patient/get/id
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await Patient.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);

  } catch (error) {
    res.status(422).json(error);
  }
})

//http://localhost:5000/Patient/update/id

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateuser = await Patient.findByIdAndUpdate(id, req.body, {
      new: true
    });
    console.log(updateuser);
    req.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
})

//http://localhost:5000/Patient/delete/id

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteuser = await Patient.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    req.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
})

module.exports = router;

/*
const router = require("express").Router();
let Patient = require("../models/Patient");

//http://localhost:5000/Patient/add
router.route("/add").post((req, res) => {
  const bookingNo = Number(req.body.bookingNo); // casting
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;
  const nic = Number(req.body.nic);

  const newPatient = new Patient({
    bookingNo,
    name,
    age,
    gender,
    nic,
  });

  newPatient
    .save()
    .then(() => {
      res.json("Patient Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//http://localhost:5000/Patient - To display patient details
router.route("/").get((req, res) => {
  Patient.find()
    .then((Patient) => {
      res.json(Patients);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.route("/update/:id").put(async (req, res) => {
  let userID = req.params.bookingNo;

  //const name = req.body.name; instead we can use D-structure like below

  const { bookingNo, name, age, gender, nic } = req.body;

  const updatePatient = {
    bookingNo,
    name,
    age,
    gender,
    nic,
  };

  const update = await Patient.findByIdAndUpdate(userID, updatePatient)
    .then(() => {
      res.status(200).send({ status: "User updated", user: update });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating dat", error: err.message });
    });
});

//http://localhost:5000/Patient/Delete

router.route("/delete/:id").delete(async (req, res) => {
  let userID = req.params.bookingNo;

  await Patient.findByIdAndDelete(userID)
    .then(() => {
      res.status(200).send({ status: "User deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete user", error: err.message });
    });
});

//fetched
router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.bookingNo;
  const user = await Patient.findById(userID)
    .then(() => {
      res.status(200).send({ status: "User fetched", user: user });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

//must export (must add this line)
module.exports = router;

*/
