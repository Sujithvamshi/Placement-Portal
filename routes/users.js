const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
router.get('/',(req, res) => {
    res.send('we are on user page')
})
router.get('/createuser',(req, res) => {
    res.send('we are on link after user')
})
router.post('/createuser',async (req ,res) => {
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const user = new User({
        email:req.body.email,
        password: hashedPassword,
        rollnumber:req.body.rollnumber,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phoneNumber:req.body.phoneNumber,
        resume:req.body.resume,
        collegeName:req.body.collegeName,
        brachName:req.body.brachName,
        isAdmin:req.body.isAdmin
    })
    try{
        const savedPost = await user.save();  
        res.status(200).json(savedPost)
    }
    catch(err){
        res.json({message: err})
    }
})
router.post('/login',async (req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("user not found");
        const passwordValid = await bcrypt.compare(req.body.password,user.password);
        !passwordValid && res.status(400).json("wrong password");
        res.send("correct pass")
    }
    catch(err){
        res.status(500).json(err);
    }
})
module.exports = router