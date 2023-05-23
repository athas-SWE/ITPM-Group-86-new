const router = require("express").Router();
//const router = express.Router();
let Doctor = require("../models/Doctor");

/*
router.get("/", (req, res) => {
  console.log("Connect");
})
*/



////http://localhost:5000/Doctor/add
router.post("/add", async (req, res) => {

  const {
    doctorID,
    name,
    age,
    gender,
    specialist,
    phoneNo,
    email,
    wardID,
  } = req.body;

  if (!doctorID || !name || !age || !gender || !specialist || !phoneNo || !email || !wardID) {
    res.status(422).json("Please fill the data");
  }
  try {
    const preuser = await Doctor.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("This user is already present");
    } else {
      const adduser = new Doctor({
        doctorID,
        name,
        age,
        gender,
        specialist,
        phoneNo,
        email,
        wardID,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }

  } catch (error) {
    //res.status(422).json(error);
  }

})

//http://localhost:5000/Doctor/getdata
router.get("/", async (req, res) => {
  try {
    const userdata = await Doctor.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);

  }
})

//http://localhost:5000/Doctor/get/id
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await Doctor.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);

  } catch (error) {
    res.status(422).json(error);
  }
})

//http://localhost:5000/Doctor/update/id

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateuser = await Doctor.findByIdAndUpdate(id, req.body, {
      new: true
    });
    console.log(updateuser);
    req.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
})

//http://localhost:5000/Doctor/delete/id

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteuser = await Doctor.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    req.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
})

module.exports = router;

//http://localhost:5000/Doctor/add
/*
router.route("/add").post((req, res) => {
  const doctorID = req.body.doctorID; // casting
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;
  const specialist = req.body.specialist;
  const phoneNo = req.body.phoneNo;
  const email = req.body.email;
  const wardID = req.body.wardID;
 
  const newDoctor = new Doctor({
    doctorID,
    name,
    age,
    gender,
    specialist,
    phoneNo,
    email,
    wardID,
  });
 
  newDoctor
    .save()
    .then(() => {
      res.json("Doctor Added");
    })
    .catch((err) => {
      console.log(err);
    });
});
 

//http://localhost:5000/Doctor - To display doctor details
router.route("/").get((req, res) => {
  Doctor.find()
    .then((Doctor) => {
      res.json(Doctor);
    })
    .catch((err) => {
      console.log(err);
    });
});

//http://localhost:5000/Doctor/update
router.route("/update/:id").put(async (req, res) => {
  let userID = req.params.doctorID;
  //const name = req.body.name; instead we can use D-structure like below
  const {
    doctorID,
    name,
    age,
    gender,
    specialist,
    phoneNo,
    email,
    wardID,
  } = req.body;

  const updateDoctor = {
    doctorID,
    name,
    age,
    gender,
    specialist,
    phoneNo,
    email,
    wardID,
  };

  const update = await Doctor.findByIdAndUpdate(userID, updateDoctor)
    .then(() => {
      res.status(200).send({ status: "User updated", user: update });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//http://localhost:5000/Doctor/Delete

router.route("/delete/:id").delete(async (req, res) => {
  let userID = req.params.doctorID;

  await Doctor.findByIdAndDelete(userID)
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



//http://localhost:5000/Doctor/get/id
router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id;
  const user = await Doctor.findById(userID)
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
