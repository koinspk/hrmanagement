const mongoose = require('mongoose');
const { Schema } = mongoose;


const usergroupSchema = new Schema({
    name : String,
    description : String,
    // user : [{
    //     type : Schema.Types.ObjectId , ref : 'User'
    // }],
    // slug: { type: String,unique: true },
});



let usergroupCompile = mongoose.model('Usergroup', usergroupSchema);

module.exports = usergroupCompile;