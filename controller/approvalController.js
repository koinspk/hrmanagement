const approvalModel = require('../model/approvalModel');
const approvalactionModel = require('../model/approvalactionModel')

const _post = async(req,res) => {
    const record = req.body;
    try {
        let response = await approvalModel.create(record);
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        return res.status(403).send(error)
    }
}

const _get = async(req,res) => {
    try {
        let response = await approvalModel.find();
        let totalcount = await clientModel.countDocuments()
        return res.status(201).send({response,totalcount});
    } catch (error) {
        return res.status(403).send(error)
    }
    
}

const leaveRequest = async (req, res) => {
    try {
        const { groupid } = req.params;
        const records = await approvalModel.findOne({ 'group': groupid });
        await approvalactionModel.create(records);
        return res.status(200).json(records);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const findbyId = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await approvalModel.findById(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdanddelete = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await approvalModel.findByIdAndDelete(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdandUpdate = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await approvalModel.findByIdAndUpdate(id,req.body);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
}
}

module.exports = {
    _post,
    _get,
    findbyId,
    findbyIdanddelete,
    findbyIdandUpdate,
    leaveRequest
}