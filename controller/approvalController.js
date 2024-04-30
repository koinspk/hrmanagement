const approvalModel = require('../model/approvalModel');
const approvalactionModel = require('../model/approvalactionModel')
const aqp = require('api-query-params');

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
        // let response = await approvalModel.find().populate('group');
        const { filter, skip, limit, sort, projection, population } = aqp(req.query);
        let response =   rolegroupModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population);
        let totalcount = await approvalModel.countDocuments(filter);
        return res.status(201).send({response,totalcount});
    } catch (error) {
        return res.status(403).send(error)
    }
    
}

const leaveRequest = async (req, res) => {
    try {
        
        const { groupid } = req.params;
        // console.log(groupid)
        const records = await approvalModel.findOne({ 'group': groupid });
        await approvalactionModel.create(records);
        console.log(records);
        return res.status(200).json(records);
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// const leaveRequest = async (req, res) => {
//     try {
//         const { groupid } = req.params;
//         if (!groupid) {
//             return res.status(400).json({ error: 'Group ID is required' });
//         }

//         const record = await approvalModel.findOne({ group: groupid }).populate('group').execPopulate();
//         console.log(record);
//         if (!record) {
//             return res.status(404).json({ error: 'Record not found' });
//         }
      
//         const existingRecord = await approvalactionModel.findOne({ group: groupid });
//         if (existingRecord) {
//             return res.status(400).json({ error: 'Approval action record already exists for this group' });
//         }

//         const approvalActionRecord = await approvalactionModel.create(record);
//         return res.status(200).json(approvalActionRecord);
       
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

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