const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const _post = async(req,res) =>{
    const record = req.body;
    try {
        let response = await userModel.create(record);
        console.log("data added");
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        return res.status(403).send(error)
    }
}



const _get = async(req,res) => {
    try {
        let response = await userModel.find();
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
    
}


const findbyId = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await userModel.findById(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdanddelete = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await userModel.findByIdAndDelete(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdandUpdate = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await userModel.findByIdAndUpdate(id,req.body);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
}
}

const loginValidation = async (req,res)=>{
    const {email,password} = req.body;
    // console.log(req.body);
try{
    const user = await userModel.findOne({ 'contactinformation.emailaddress': email });
    
    if(!user){
        return res.status(404).json({message:'InCorrect Username or Password'});
    }
    //check passwrd
    const isMatch = await bcrypt.compare(password, user.personalinformation.password);
    if (!isMatch) {
      return res.status(401).json({message:'InCorrect Username or Password'});
    }
    //token
    const accessToken = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
    //refresh token
    const refreshToken = jwt.sign({userId: user._id}, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'})
    return res.status(200).json({accessToken,refreshToken});
}
catch(err){
    console.log(`Login Error:${err}`);
    return res.status(500).json({message:"Internal server error"})
}
}




module.exports = {
    _post,
    _get,
    findbyId,
    findbyIdanddelete,
    findbyIdandUpdate,
    loginValidation
}