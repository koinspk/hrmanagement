const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    personalinformation : {
        name : { type : String , required : true  },
        dateofbirth : { type : Date , default : Date.now() , required : true },
        gender : { type : String , enum : [ 'Male' , 'Female' , 'Others' ] , required : true  },
        contactinformation : {
            address : { type : String   },
            phoneno : { type : Number , required : true  },
            email : { type : String , required : true  },
        }
    }
},{ timestamps: true});


 module.exports =  mongoose.model('User',userSchema);