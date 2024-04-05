const multer = require('multer');
const fs = require('fs');
const express =require('express')
const app = express();

// Body parsing middleware for parsing form data

const profilePic = multer.diskStorage({
  
  destination(req,file,cb){
    var url = ""
    var foldername=""
    var profile=""

     const baseUrl = req.baseUrl
     if (baseUrl=="/user"){
      let maps = req.files.map((val)=>{
        if(val.fieldname=="certificates"){
          profile="certificates"
        }else{
          profile="Profile"
        }
      })
      const name = req.body['personalinformation.name'];
       foldername = name

     }else{
       foldername = req.body.name
       profile="Companyprofile"
     }

    url =`./public/${baseUrl}/${foldername}/${profile}`;
    
    if(!fs.existsSync(url)){
      fs.mkdirSync(url,{recursive:true});
    }
    cb(null,url);
  },
  filename(req,file,cb){
    var unix = Math.round(+new Date()/1000);
    cb(null,`${unix}-${file.originalname}`); 
  }
})




const profileUpload = multer({ storage: profilePic });
module.exports = profileUpload;