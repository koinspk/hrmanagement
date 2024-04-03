const mongoose = require("mongoose");
const {Schema} =  mongoose;


const companySchema = new Schema({
    name:{type:String},
    location:{type:String},
    weblink:{type:String},
    starttime:{type:Date},
    endtime:{type:Date},
    startofweek:{type:String},
    endofweek:{type:String},
    logo:{type:String}
})


const Company = mongoose.model('Company',companySchema);
module.exports=Company;