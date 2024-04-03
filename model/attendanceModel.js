const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
        employeeid:{type:Number,required:true},
        checkin:{type: Date},
        checkout:{type: Date},
        workinghours:{type:Date},
        breaktime:[{type: Date}]
},{ timestamps: true });


attendanceSchema.virtual('workingHours').get(function() {
    if (!this.checkin || !this.checkout) {
        return null; 
    }

    const checkinTime = moment(this.checkin);
    const checkoutTime = moment(this.checkout);

    let breakTimeHours = 0;
    if (Array.isArray(this.breaktime) && this.breaktime.length >= 2) {
        for (let i = 0; i < this.breaktime.length - 1; i += 2) {
            const breakStart = moment(this.breaktime[i], 'HH:mm:ss');
            const breakEnd = moment(this.breaktime[i + 1], 'HH:mm:ss');
            const breakDuration = breakEnd.diff(breakStart, 'hours', true);
            breakTimeHours += breakDuration;
        }
    }

    const totalWorkingHours = checkoutTime.diff(checkinTime, 'hours') - breakTimeHours;
    return totalWorkingHours >= 0 ? totalWorkingHours : 0;
});

module.exports =  mongoose.model('attendanceSchema',attendanceSchema);