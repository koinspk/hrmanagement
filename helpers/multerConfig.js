const multer = require('multer')
const fs = require('fs');
const path = require('path');
const userModel = require('../model/user');

const createDirectoryIfNotExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const ProfilePicStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const userId = req.params.id; 
      const user = await userModel.findById(userId);
      
      if (!user || !user.personalinformation || !user.personalinformation.name) {
        return cb(new Error('User information incomplete'));
      }
      
      const uploadPath = path.join(__dirname, `../public/${user.personalinformation.name}/`);
      createDirectoryIfNotExists(uploadPath); // Create directory if it doesn't exist
      cb(null, uploadPath);
    } catch (error) {
      console.error('Error fetching user:', error);
      cb(new Error('Error fetching user'));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Add a unique filename
  }
});
  
  const upload = multer({ storage: ProfilePicStorage });

  module.exports = upload;
                                              