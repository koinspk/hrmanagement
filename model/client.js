const mongoose = require("mongoose");
const {Schema} = mongoose;

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
    country:{ type: Schema.Types.ObjectId, ref: 'Country' }
},
{ timestamps: true})


  

const Client = mongoose.model("Client",clientSchema)
module.exports=Client;