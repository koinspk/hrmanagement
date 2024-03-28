const userModel = require('../model/user');//user details
const bcrypt = require('bcrypt');
const { log } = require('console');
const jwt = require('jsonwebtoken');
const path = require('path');

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
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;
    try {
        let response = await userModel.find().limit(limit).skip(skip);
        const totalCount = await userModel.find().countDocuments();
        return res.status(201).send({response,totalCount});

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

//login Autebtication
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
    const accessToken = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXP});
    //refresh token
    const refreshToken = jwt.sign({userId: user._id}, process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXP})
    return res.status(200).json({accessToken,refreshToken});
}
catch(err){
    console.log(`Login Error:${err}`);
    return res.status(500).json({message:"Internal server error"})
}
}

//image upload
const handleUpload = async (req, res) => {
    try {
        const userId = req.params.id; 
        const user = await userModel.findById(userId);
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const imagePath = path.join(`public/${user.personalinformation.name}/`, req.file.filename); // Construct the image path
      const updatedUser = await userModel.findByIdAndUpdate(user, { imagePath: imagePath }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'Image uploaded successfully', user: updatedUser });
    } catch (error) {
      log(req)
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user'});
    }
  };
  




module.exports = {
    _post,
    _get,
    findbyId,
    findbyIdanddelete,
    findbyIdandUpdate,
    loginValidation,
    handleUpload
}