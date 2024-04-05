const mongoose = require("mongoose");
const {Schema} =  mongoose;


const companySchema = new Schema({
    name:{type:String ,required:true},
    location:{type:String ,required:true},
    website:{type:String ,required:true},
    CompanyStarttime:{type:Date ,required:true},
    Endtime:{type:Date ,required:true},
    StartofWeek:{type:String,required:true},
    EndofWeek:{type:String,required:true},
    profile:{type:String}
})


const Company = mongoose.model('Company',companySchema);
module.exports=Company;