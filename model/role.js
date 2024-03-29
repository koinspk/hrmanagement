const mongoose = require('mongoose');

const { Schema } = mongoose;


const rolesSchema = new Schema({
    role:{
        type:String,
        require:true
    }
})

const Role = mongoose.model('Role', rolesSchema);
module.exports = Role;