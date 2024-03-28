const mongoose = require('mongoose');
const { Schema } = mongoose;
// const slugify = require('slugify');


const usergroupSchema = new Schema({
    name : String,
    user : [{
        type : Schema.Types.ObjectId , ref : 'User'
    }],
    slug: { type: String,unique: true },
});





let usergroupCompile = mongoose.model('Usergroup', usergroupSchema);

module.exports = usergroupCompile;