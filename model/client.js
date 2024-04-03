const mongoose = require("mongoose");
const {Schema} = mongoose;

const countrySchema = new Schema({
    countryCode: {
      type: String,
      required: true,
      unique: true,
    },
    countryName: {
      type: String,
      required: true,
    },
});


const clientSchema = new Schema({
    company:{type:String,require:true},
    vatnumber:{type:Number,required:true},
    phone:{type:Number,required:true},
    website:{type:String,require:true},
    group:{type:String,enum:["High budget","Low budget","VIP","Wholesaler"],required:true},
    address:{type:String,require:true},
    city:{type:String,require:true},
    state:{type:String,require:true},
    zipcode:{type:String,require:true},
    country:countrySchema
},
{ timestamps: true})


const Client = mongoose.model("Client",clientSchema)
module.exports=Client;