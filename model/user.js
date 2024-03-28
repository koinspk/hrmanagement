// const { Email } = require('@mui/icons-material');
const mongoose = require('mongoose');
const { Schema} = mongoose;
const bycrpt = require("bcrypt");
const moment = require('moment');

//personalInf
const personalInformation = new Schema({
    name : { type : String , required : true  },
    employeeid : { type : Number , required : true },
    nationality:{ type:String , required : true },
    maritalstatus:{type : String , enum : [ 'Married' , 'Single' ] , required : true },
    gender : { type : String , enum : [ 'Male' , 'Female' , 'Others' ] , required : true  },
    dob:{type:Date,required:true},
    password : String
});

//contactInf
const contactInformation = new Schema({
    emailaddress:{type:String , required:true},
    phonenumber:{type:Number,required:true},
    address:{type:String , required:true}
});

//Employeedetails
const employementDetails = new Schema({
    department:{type:String,required:true},
    position:{type:String,required:true},
    manager:{type:String,required:true},
    startdate:{type:Date,required:true}
});

//compensation
const compensationAndBenefits=new Schema({
    salary:{type:Number ,required:true},
    benefits:{type:String ,required:true},
    bankaccountdetails:{type:Number,required:true}
});

//emergencyNum 
const EmergencyContact=new Schema({
    emergencycontactname:{type:String,required:true},
    emergencycontactnumber:{type:Number,required:true}

});

const userSchema = new Schema({
    personalinformation : personalInformation,
    contactinformation:contactInformation,
    employementdetails :employementDetails,
    compensationandbenefits:compensationAndBenefits,
    emergencycontact:EmergencyContact

},
{ timestamps: true},
);


// Define virtual property for password
// userSchema.virtual('password').get(function () {
//     console.log(this.personalinformation.dob);
//     const firstName = this.personalinformation.name.slice(0, 4).toLowerCase();
//     const year = this.personalinformation.dob.getFullYear().toString();
//     return firstName + year;
// });

// Hash password before saving
userSchema.pre('save', async function (next) {
 //   if (!this.isModified('personalinformation')) return next();
    try {
        const firstName = this.personalinformation.name.slice(0, 4).toLowerCase();
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
