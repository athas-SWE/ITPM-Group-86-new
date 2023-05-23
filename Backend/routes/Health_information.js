const router = require("express").Router();
//const Patient = require("../models/Patient");
//const router = express.Router();
let Health_info = require("../models/Health_info");


//http://localhost:5000/Health_info/add
router.post("/add", async (req, res) => {

  const {
    patientNo,
    name,
    DOB,
    wardID,
    sugar,
    cholesterol,
    hct,
    mcv,
    mch,
    mchc,
    rdwcv,
    rdwsd,

  } = req.body;

  if (!patientNo || !name || !DOB || !wardID || !sugar || !cholesterol || !hct || !mcv || !mch || !mchc || !rdwcv || !rdwsd) {
    res.status(422).json("Please fill the data");
  }
  try {
    const preuser = await Health_info.findOne({ wardID: wardID });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("This user is already present");
    } else {
      const adduser = new Health_info({
        patientNo,
        name,
        DOB,
        wardID,
        sugar,
        cholesterol,
        hct,
        mcv,
        mch,
        mchc,
        rdwcv,
        rdwsd,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }

  } catch (error) {
    //res.status(422).json(error);
  }

})

//http://localhost:5000/Health_info/getdata
router.get("/", async (req, res) => {
  try {
    const userdata = await Health_info.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);

  }
})

//http://localhost:5000/Health_info/get/id
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await Health_info.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);

  } catch (error) {
    res.status(422).json(error);
  }
})

//http://localhost:5000/Health_info/update/id

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateuser = await Health_info.findByIdAndUpdate(id, req.body, {
      new: true
    });
    console.log(updateuser);
    req.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
})

//http://localhost:5000/Health_info/delete/id

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteuser = await Health_info.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    req.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
})

module.exports = router;

/*
const express = require('express');
let Health_info = require("../models/Health_info");
const cors = require("cors");

const router = express.Router();

router.use(express.json());
router.use(cors());



router.get("/getDocs", async (req, res) => {
  Health_info.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })

});

router.post("/addDocs", async (req, res) => {
  const docs = req.body;
  const newdocs = new Health_info(docs);
  await newdocs.save();

  res.json(docs);
});


router.post("/updateAge", async (req, res) => {

  const NewpatientNo = req.body.NewpatientNo;
  const Newname = req.body.Newname;
  const NewDOB = req.body.NewDOB;
  const NewwardID = req.body.NewwardID;
  const Newsugar = req.body.Newsugar;
  const Newcholesterol = req.body.Newcholesterol;
  const Newhct = req.body.Newhct;
  const Newmcv = req.body.Newmcv;
  const Newmch = req.body.Newmch;
  const Newmchc = req.body.Newmchc;
  const Newrdwcv = req.body.Newrdwcv;
  const Newrdwsd = req.body.Newrdwsd;
  const id = req.body.id;

  console.log(NewpatientNo, Newname, NewDOB, NewwardID, Newsugar, Newcholesterol, Newhct, Newmcv, Newmch, Newmchc, Newrdwcv, Newrdwsd);
  try {
    let filter = { '_id': id }
    let update = {

      $set: { 'patientNo': NewpatientNo, 'name': Newname, 'DOB': NewDOB, 'wardID': NewwardID, 'sugar': Newsugar, 'cholesterol': Newcholesterol, 'hct': Newhct, 'mcv': Newmcv, 'mch': Newmch, 'mchc': Newmchc, 'rdwcv': Newrdwcv, 'rdwsd': Newrdwsd },

    }
    await Health_info.findOneAndUpdate(filter, update);
    //  await Health_info.findOneAndUpdate(filter, update, {upsert: false, new: true });
  } catch (err) {
    console.log(err);
  }
  res.send("updated")
});

router.post('/deletedoc/:id', async (req, res) => {
  const id = req.body.id;
  try {
    let filter = { '_id': id }

    await Health_info.findByIdAndDelete(filter);
  } catch (err) {
    console.log(err);
  }
  res.send("deleted");
})

module.exports = router;

*/





