const attendanceModel = require('../model/attendanceModel');
const moment = require('moment');

const _post = async(req,res) => {
    const record = req.body;
    try {
        let response = await attendanceModel.create(record);
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        return res.status(403).send(error);
    }
}


const _get = async(req,res) => {
    try {
        let response = await attendanceModel.find();
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error);
    }
    
}


const findbyId = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await attendanceModel.findById(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdanddelete = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await attendanceModel.findByIdAndDelete(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdandUpdate = async(req,res) => {
    try {
        const { id } = req.params;
        const { type, checkin, checkout, breaktime  } = req.body;
        const employee = await attendanceModel.findById(id);
        switch (type) {
            case 'checkin':
                if (!checkin && req.body.hasOwnProperty('checkin')) {     //hasOwnProperty used to check if an object has a specific property
                    employee.checkin = new Date(checkin);
                    await employee.save();
                }
                break;

            case 'checkout':
                if (!checkout && req.body.hasOwnProperty('checkout')) {
                    employee.checkout = new Date(checkout);
                    await employee.save();
                }
                break;

            case 'breaktime':
                employee.breaktime.push(new Date(breaktime));
           
                await employee.save();
                return res.status(200).json({ message: 'Break time added successfully', employee });
            default:
                return res.status(400).json({ error: 'Invalid type' });
        }
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
};


const working_hours = async (req, res) => {
    try {
        const { checkin, checkout, breaktime,employeeid } = req.body;
        if (!checkin || !checkout) {
            return res.status(400).json({ error: 'checkin and checkout dates are required' });
        }

        const checkinTime = moment(checkin);
        const checkoutTime = moment(checkout);

        let breakTimeDifferences = [];
        if (Array.isArray(breaktime) && breaktime.length >= 2) {
            for (let i = 0; i < breaktime.length - 1; i += 2) {
                const breakStart = moment(breaktime[i], 'HH:mm:ss');
                const breakEnd = moment(breaktime[i + 1], 'HH:mm:ss');
                const breakDuration = breakEnd.diff(breakStart, 'hours', true);
                breakTimeDifferences.push(breakDuration);
            }
        }

        const totalBreakTime = breakTimeDifferences.reduce((total, duration) => total + duration, 0);
        const breakTimeHours = totalBreakTime;
        console.log(checkinTime.format('YYYY HH:mm:ss'))
        // const breakTimeHours  = breaktime ? moment.duration(breaktime).asHours() : 0;
        const diffHours = checkoutTime.diff(checkinTime, 'hours') - breakTimeHours;
        if (diffHours < 0) {
            return res.status(400).json({ error: 'Invalid working hours' });
        }
        
        res.status(200).json({  employeeid:employeeid,checkin:checkin,checkout:checkout,breaktime:breaktime, workinghours:diffHours}); 

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    _post,
    _get,
    findbyId,
    findbyIdanddelete,
    findbyIdandUpdate,
    working_hours
}