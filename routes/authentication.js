//Making necessary imports
const router = require('express').Router();
const User = require('../models/userModel');
const Joi=require('@hapi/joi')
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//defining validation schema

const validScehma=Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    middleName:Joi.string(),
    email:Joi.string().required(),
    password:Joi.string().required(),
    userName:Joi.string().required(),
    type:Joi.string().required()
})

router.post('/register', async (req, res)=>{
    let associatedAccount, utype;
    
    //validate request structure
    const {error} = validScehma.validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    
    //check if email exists
    const emailExists = await User.findOne({email : req.body.email});
    if(emailExists) return res.status(400).send({err:"Email invalid"});

    //setting up bcrupt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if (req.body.type==='STUDENT'){
        associatedAccount = new Student({
            email:req.body.email
        })
        
        utype="STUDENT";

    }

    if (req.body.type==='TEACHER'){
        associatedAccount = new Teacher({
            email:req.body.email
        })
        utype="TEACHER";
    }
    
    associatedAccount = await associatedAccount.save();


    const user=new User({
        userName:req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        firstName:req.body.firstName,
        middleName:req.body.middleName,
        lastName: req.body.lastName,
        associatedID:associatedAccount,
        utype
    })


    try{
        const savedUser= await user.save();
        return res.status(200).json(savedUser);
    }catch (err){
        return res.status(400).json(err);
    }
})



router.post('/login', async (req, res)=>{
    
    //validate request structure
    const {error} = validScehma.validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    
    //check if email exists
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).json({err:"Email or password invalid"});

    //setting up bcrypt
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json({err:"Email or password invalid"});

    //creating jwt for accessing  token
    const token = jwt.sign({uid:user._id, type:user.utype}, process.env.TOKEN_SECRET)
    
    //setting up resonse header
    res.header('token', token);
    return res.status(200).json(token);


})

router.get('/logout', async (req, res)=>{
    res.header('token',null);
    return res.status(200).json({success:"logged out successfully"});


})


module.exports = router
