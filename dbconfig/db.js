//require('dotenv').config()
const mongoose = require('mongoose');

module.exports = function () {
mongoose.connect('mongodb://127.0.0.1:27017/hrmanagement');  
mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        // console.log(names); 
    });
})  
mongoose.connection.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // process.exit(1); // Gracefully exit the application
  });
  
return mongoose
};
