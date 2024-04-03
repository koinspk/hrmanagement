const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
        employeeid:{type:Number,required:true},
        checkin:{type: Date},
        checkout:{type: Date},
        workinghours:{type:Date},
        breaktime:[{type: Date}]
},{ timestamps: true });


module.exports =  mongoose.model('employeeSchema',attendanceSchema);