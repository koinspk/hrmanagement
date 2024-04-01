const employeeModel = require('../model/employeeModel');
const moment = require("moment");

const _post = async(req,res) => {
    const record = req.body;
    try {
        let response = await employeeModel.create(record);
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        return res.status(403).send(error);
    }
}


const _get = async(req,res) => {
    try {
        let response = await employeeModel.find();
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error);
    }
    
}


const findbyId = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await employeeModel.findById(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdanddelete = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await employeeModel.findByIdAndDelete(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdandUpdate = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await employeeModel.findByIdAndUpdate(id,req.body);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
}
}

const working_hours = async (req, res) => {
    try {
        const { checkin, checkout, breaktime } = req.body;
        if (!checkin || !checkout) {
            return res.status(400).json({ error: 'checkin and checkout dates are required' });
        }

        const checkinTime = moment(checkin);
        const checkoutTime = moment(checkout);
        const breakTime = breaktime ? moment.duration(breaktime).asHours() : 0;
        const diffHours = checkoutTime.diff(checkinTime, 'hours');
        const workingHours = diffHours - breakTime;

        if (workingHours < 0) {
            return res.status(400).json({ error: 'Invalid working hours' });
        }

        res.status(200).json({ message: 'Request received successfully', workingHours });
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