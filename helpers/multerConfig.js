const multer = require('multer');
const fs = require('fs');

const profilePic = multer.diskStorage({
  destination(req,file,cb){
    var url = ""
    // const foldername = req.headers.dbname || "Photo";
    const foldername = req.body.name || "Photo";
    console.log(req.body)
    // const storagetype =req.body.storagetype/${storagetype}
    url =`./public/${foldername}`
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
