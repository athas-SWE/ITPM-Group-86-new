const router = require("express").Router();
//const Ward = require("../models/Ward");
//const router = express.Router();
let Ward = require("../models/Ward");


//http://localhost:5000/Ward/add
router.post("/add", async (req, res) => {

  const {
    wardID,
    name,
    ICU,
    Normal,
    TotNoOfPatients,
    TotNoOfDoctors,
    TotNoOfNurse,
  } = req.body;

  if (!wardID || !name || !ICU || !Normal || !TotNoOfPatients || !TotNoOfDoctors || !TotNoOfNurse) {
    res.status(422).json("Please fill the data");
  }
  try {
    const preuser = await Ward.findOne({ wardID: wardID });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("This user is already present");
    } else {
      const adduser = new Ward({
        wardID,
        name,
        ICU,
        Normal,
        TotNoOfPatients,
        TotNoOfDoctors,
        TotNoOfNurse,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }

  } catch (error) {
    res.status(422).json(error);
  }

})

//http://localhost:5000/Ward/getdata
router.get("/", async (req, res) => {
  try {
    const userdata = await Ward.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);

  }
})

//http://localhost:5000/Ward/get/id
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await Ward.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);

  } catch (error) {
    res.status(422).json(error);
  }
})

//http://localhost:5000/Ward/update/id

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateuser = await Ward.findByIdAndUpdate(id, req.body, {
      new: true
    });
    console.log(updateuser);
    req.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
})

//http://localhost:5000/Ward/delete/id

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteuser = await Ward.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    req.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
})

module.exports = router;

