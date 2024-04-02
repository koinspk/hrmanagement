const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
        employeeid:{type:Number,require:true},
        checkin:{type: Date},
        checkout:{type: Date},
        workinghours:{type:Number},
        breaktime:[{type: Date}]
},{ timestamps: true });


module.exports =  mongoose.model('employeeSchema',employeeSchema);