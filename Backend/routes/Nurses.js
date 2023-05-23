const router = require("express").Router();
//const Nurse = require("../models/Nurse");
//const router = express.Router();
let Nurse = require("../models/Nurse");

/*
router.get("/", (req, res) => {
  console.log("Connect");
})
*/

////http://localhost:5000/Nurse/add
router.post("/add", async (req, res) => {

  const {
    nurseID,
    name,
    age,
    gender,
    phoneNo,
    email,
    wardID,
  } = req.body;

  if (!nurseID || !name || !age || !gender || !phoneNo || !email || !wardID) {
    res.status(422).json("Please fill the data");
  }
  try {
    const preuser = await Nurse.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("This user is already present");
    } else {
      const adduser = new Nurse({
        nurseID,
        name,
        age,
        gender,
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

//http://localhost:5000/Nurse/getdata
router.get("/", async (req, res) => {
  try {
    const userdata = await Nurse.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);

  }
})

//http://localhost:5000/Nurse/get/id
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await Nurse.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);

  } catch (error) {
    res.status(422).json(error);
  }
})

//http://localhost:5000/Nurse/update/id

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateuser = await Nurse.findByIdAndUpdate(id, req.body, {
      new: true
    });
    console.log(updateuser);
    req.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
})

//http://localhost:5000/Nurse/delete/id

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteuser = await Nurse.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    req.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
})

module.exports = router;

/*
const router = require("express").Router();
let Nurse = require("../models/Nurse");

//http://localhost:5000/Nurse/add
router.route("/add").post((req, res) => {
  const nurseID = Number(req.body.nurseID); // casting
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;
  const nic = Number(req.body.nic);
  const workingWardID = req.body.workingWardID;

  const newNurse = new Nurse({
    nurseID,
    name,
    age,
    gender,
    nic,
    workingWardID,
  });

  newNurse
    .save()
    .then(() => {
      res.json("Nurse Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//http://localhost:5000/Nurse - To display nurse details
router.route("/").get((req, res) => {
  Nurse.find()
    .then((Nurse) => {
      res.json(Nurses);
    })
    .catch((err) => {
      console.log(err);
    });
});

//http://localhost:5000/Nurse/update
router.route("/update/:id").put(async (req, res) => {
  let userID = req.params.nurseID;

  //const name = req.body.name; instead we can use D-structure like below

  const { nurseID, name, age, gender, nic, workingWardID } = req.body;

  const updateNurse = {
    nurseID,
    name,
    age,
    gender,
    nic,
    workingWardID,
  };

  const update = await Nurse.findByIdAndUpdate(userID, updateNurse)
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

//http://localhost:5000/Nurse/Delete

router.route("/delete/:id").delete(async (req, res) => {
  let userID = req.params.nurseID;

  await Nurse.findByIdAndDelete(userID)
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
  let userID = req.params.nurseID;
  const user = await Nurse.findById(userID)
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