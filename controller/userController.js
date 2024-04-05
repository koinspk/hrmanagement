const userModel = require('../model/user');//user details
const bcrypt = require('bcrypt');
const { log } = require('console');
const jwt = require('jsonwebtoken');
const path = require('path');
const aqp = require('api-query-params');

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
const _get = async (req, res) => {
    try {
      const { filter, limit, skip } = aqp(req.query);
  
      let query = userModel.find(filter).limit(limit).skip(skip);
      let response = await query.exec();
  
      const totalCount = await userModel.countDocuments(filter);
  
      return res.status(200).send({ response, totalCount });
    } catch (error) {
      console.error('Error retrieving data:', error);
      return res.status(500).send({ message: 'Internal server error' });
    }
};


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


// const findbyIdandUpdate = async(req,res) => {
//     try {
//         const { id } = req.params;
//         let response = await userModel.findByIdAndUpdate(id,req.body);
//         return res.status(201).send(response);
//     } catch (error) {
//         return res.status(403).send(error)
// }
// }


const findbyIdandUpdate = async (req, res) => {
  try {
      const { id } = req.params;
      const formData = req.body;

      // Extract certificates array from files
      const certificates = req.files.map(file => file.path);

      const user = {
          personalinformation: {
              name: formData['personalinformation.name'],
              employeeid: formData['personalinformation.employeeid'],
              maritalstatus: formData['personalinformation.maritalstatus'],
              dob: formData['personalinformation.dob'],
              gender: formData['personalinformation.gender'],
              nationality: formData['personalinformation.nationality'],
              password: formData['personalinformation.password']
          },
          contactinformation: {
              emailaddress: formData['contactinformation.emailaddress'],
              phonenumber: formData['contactinformation.phonenumber'],
              address: formData['contactinformation.address']
          },
          employmentdetails: {
              department: formData['employmentdetails.department'],
              jobtitle: formData['employmentdetails.jobtitle'],
              manager: formData['employmentdetails.manager'],
              startdate: formData['employmentdetails.startdate'],
              skills: formData['employmentdetails.skills'].split(',') // Assuming skills are comma-separated
          },
          compensation: {
              salary: formData['compensation.salary'],
              benefits: formData['compensation.benefits'],
              bankaccount: formData['compensation.bankaccount']
          },
          emergencycontacts: {
              emergencycontactname: formData['emergencycontacts.emergencycontactname'],
              emergencycontactnumber: formData['emergencycontacts.emergencycontactnumber']
          },
          imagePath: req.files[0] ? req.files[0].path : '',
          certificates: certificates
      };

      const response = await User.findByIdAndUpdate(id, user, { new: true });
      return res.status(201).send(response);
  } catch (error) {
      return res.status(403).send(error);
  }
};

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
    return res.status(200).json({accessToken});
}
catch(err){
    console.log(`Login Error:${err}`);
    return res.status(500).json({message:"Internal server error"})
}
}

//upload
const handleUpload = async (req, res) => {
  try {
    let arr=[]
    let maps =req.files.map((val)=> {
      if(val.fieldname=="certificates"){
         arr.push(val.path)
      }
      
    })
    // console.log(arr)
    const formData = req.body;
    const user ={
      personalinformation: {
        name: formData['personalinformation.name'],
        employeeid: formData['personalinformation.employeeid'],
        maritalstatus: formData['personalinformation.maritalstatus'],
        dob: formData['personalinformation.dob'],
        gender: formData['personalinformation.gender'],
        nationality: formData['personalinformation.nationality'],
        password: formData['personalinformation.password']
      },
      contactinformation: {
        emailaddress: formData['contactinformation.emailaddress'],
        phonenumber: formData['contactinformation.phonenumber'],
        address: formData['contactinformation.address']
      },
      employmentdetails: {
        department: formData['employmentdetails.department'],
        jobtitle: formData['employmentdetails.jobtitle'],
        manager: formData['employmentdetails.manager'],
        startdate: formData['employmentdetails.startdate'],
        skills: formData['employmentdetails.skills'].split(',') // Assuming skills are comma-separated
      },
      compensation: {
        salary: formData['compensation.salary'],
        benefits: formData['compensation.benefits'],
        bankaccount: formData['compensation.bankaccount']
      },
      emergencycontacts: {
        emergencycontactname: formData['emergencycontacts.emergencycontactname'],
        emergencycontactnumber: formData['emergencycontacts.emergencycontactnumber']
      },
      imagePath: req?.files[0] ?.path?? '',
      certificates:arr
    }
    // Create a new user instance with FormData
    const newUser = await new userModel(user);

    // Save the user data to MongoDB
    await newUser.save();
    res.status(201).send('User data saved successfully');
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).send('Internal Server Error');
  }
}

  

module.exports = {
    _post,
    _get,
    findbyId,
    findbyIdanddelete,
    findbyIdandUpdate,
    loginValidation,
    handleUpload,
}