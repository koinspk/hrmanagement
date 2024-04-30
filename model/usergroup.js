const mongoose = require('mongoose');
const { Schema } = mongoose;


const usergroupSchema = new Schema({
    name : String,
    description : String,
});



let usergroupCompile = mongoose.model('group', usergroupSchema);

module.exports = usergroupCompile;