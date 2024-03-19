// const { Email } = require('@mui/icons-material');
const mongoose = require('mongoose');
const { Schema} = mongoose;
const bycrpt = require("bcrypt");
const moment = require("moment");
//personalInfor
const personalInformation = new Schema({
    name : { type : String , required : true  },
    employeeid : { type : Number , required : true },
    nationality:{ type:String },
    maritalstatus:{type : String , enum : [ 'married' , 'unmarried' ] , required : true },
    gender : { type : String , enum : [ 'Male' , 'Female' , 'Others' ] },
    dob:{type:Date,required:true},
    password : String
});

//contactInfor
const contactInformation = new Schema({
    emailaddress:{type:String , required:true},
    phonenumber:{type:Number,required:true},
    address:{type:String , required:true}
});

//Employeedetails
const employementDetails = new Schema({
    department:{type:String},
    position:{type:String,required:true},
    manager:{type:String},
    startdate:{type:Date,required:true}
});

//compensation
const compensationAndBenefits=new Schema({
    salary:{type:Number },
    benefits:{type:String },
    bankaccountdetails:{type:Number,required:true}
});

//emergencyNum 
const EmergencyContact=new Schema({
    emergencycontactname:{type:String,required:true},
    emergencycontactnumber:{type:Number,required:true}

});

//UserSchema
const userSchema = new Schema({
    personalinformation : personalInformation,
    contactinformation:contactInformation,
    employementdetails :employementDetails,
    compensationandbenefits:compensationAndBenefits,
    emergencycontact:EmergencyContact,
    profiledocument:String
},
{ timestamps: true},
);


userSchema.pre('save', async function (next) {
    try {
        const firstName = this.personalinformation.name.slice(0, 4).toLowerCase();
        // console.log(firstName);
        let year = moment(this.personalinformation.dob).format('yyyy');
        const hashedPassword = await bycrpt.hash(firstName+year, 10);
        this.personalinformation.password = hashedPassword; // Save hashed password to the nested field
        next();
    } catch (err) {
        return next(err);
    }
});

// userSchema.p

module.exports = mongoose.model('User', userSchema);
