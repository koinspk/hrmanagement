const mongoose = require("mongoose")
const {Schema} = mongoose 



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


const Country = mongoose.model("Country",countrySchema)

module.exports=Country;