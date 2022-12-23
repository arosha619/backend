const router= require('express').Router();
let Student = require('../models/Student');


//create
router.route("/add").post((req,res)=>{
    const name=req.body.name;
    const ps=req.body.ps;
   


const newStudent = new Student({
    name,ps
})

newStudent.save().then(()=>{
    res.json("student added")
}).catch((err)=>{
    console.log(err);
})
})  


//read
router.route("/").get((req,res)=>{
    Student.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err)
    })
})

//update
router.route("/update/:id").put(async(req,res)=>{
    let userID=req.params.id;
    const {name,age,gender}=req.body;
     
    const updateStudent={
        name,age,gender
    }
    const update=await Student.findByIdAndUpdate(userID,updateStudent)
    .then(()=>{
        res.status(200).send({status:"user updated"})
    }).catch((err)=>{
        res.status(500).send({status:"error with updating",error:err.message})
    })      
})

//delete
router.route("/delete/:id").delete(async(req,res)=>{
    let userId= req.params.id;

    await Student.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"user deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with deletion",error:err.message})
    })
})

//fetch one user

router.route("/get/:id").get(async(req,res)=>{
    let userId=req.params.id;
    const user = await Student.findById(userId)
    .then((student)=>{
        res.status(200).send({status: "user fetched",student})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with get user",error:err.message});
    })
    })

module.exports = router;