const express = require("express");
const router = express.Router();
const User  = require("../models/user.model");
const SendMail = require("../utils/send-mail");

router.post("",async (req, res)  =>{
    try{
        const user = await User.create(req.body);
        SendMail("a@n",`${req.body.email_name}`,`Welcome to XYZ system ${req.body.first_name,req.body.last_name}`,`${req.body.first_name} Please Confirm Your email`);
        SendMail("a@n.com",["a@a.com","b@b.com","c@c.com","d@d.com","e@e.com"],`${req.body.first_name,req.body.last_name} has registered with us`,`Please welcome ${req.body.first_name,req.body.last_name}`,"");
        return res.status(201).send(user);
    }
    catch(err){
        return res.status(500).json({message:err.message,status :"Failed "});
    }
});

router.get("",async (req,res)=>{
    try{
        let page = +req.query.page ||1;
        let size = req.query.size ||3;
        let offset = (page-1)*size;
        console.log(page,size,offset);

        const users = await User.find({}).skip(offset).limit(size).lean().exec();
        const total_pages = Math.ceil((await User.find().countDocumnets())/size);
        return res.send ({ users, total_pages});

    }
    catch(error){
        return res.status(500).json({message:error.message,status:"Failed"})
    }
});

router.get("/:id",async (req,res)=>{
    try{
        const user = await User.findById(req.param.id).lean().exec();

        return res.send(user);
    }
    catch(err){
        return res.status(500).json({message:err.message,status:"Failed"});

    }
});

router.patch("/:id",async (req,res)=>{
    try{
        const user = await User.findByIdandUpdate(req.param.id , req.body,{
            new: true,
        }).lean().exec();
        return res.status(201).send(user);

    }
    catch(err){
        return res.status(500).json({message:err.message,status:"Failed"});
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        const user = await User.findByIdandDelete(req.param.id).lean().exec();

        return res.status(201).send(user);
    }
    catch(error){
        return res.status(500).json({message:err.message,status:"Failed"});
    }

})

module.exports = router;
