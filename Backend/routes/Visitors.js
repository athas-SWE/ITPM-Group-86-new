const router = require("express").Router();
//const Visitor = require("../models/Visitor");
//const router = express.Router();
let Visitor = require("../models/Visitor");


//http://localhost:5000/Visitor/add
router.post("/add", async (req, res) => {

    const {
        visitorNo,
        name,
        age,
        gender,
        nic,
        email,
        phoneNo,
        patientNo,
        wardID,
    } = req.body;

    if (!visitorNo || !name || !age || !gender || !nic || !email || !phoneNo || !patientNo || !wardID) {
        res.status(422).json("Please fill the data");
    }
    try {
        const preuser = await Visitor.findOne({ email: email });
        console.log(preuser);

        if (preuser) {
            res.status(422).json("This user is already present");
        } else {
            const adduser = new Visitor({
                visitorNo,
                name,
                age,
                gender,
                nic,
                email,
                phoneNo,
                patientNo,
                wardID,
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
    }

})

//http://localhost:5000/Visitor/getdata
router.get("/", async (req, res) => {
    try {
        const userdata = await Visitor.find();
        res.status(201).json(userdata);
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);

    }
})

//http://localhost:5000/Visitor/get/id
router.get("/getuser/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const userindividual = await Visitor.findById({ _id: id });
        console.log(userindividual);
        res.status(201).json(userindividual);

    } catch (error) {
        res.status(422).json(error);
    }
})

//http://localhost:5000/Visitor/update/id

router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateuser = await Visitor.findByIdAndUpdate(id, req.body, {
            new: true
        });
        console.log(updateuser);
        req.status(201).json(updateuser);
    } catch (error) {
        res.status(422).json(error);
    }
})

//http://localhost:5000/Visitor/delete/id

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteuser = await Visitor.findByIdAndDelete({ _id: id });
        console.log(deleteuser);
        req.status(201).json(deleteuser);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;

