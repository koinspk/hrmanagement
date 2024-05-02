const approvalModel = require('../model/approvalModel');
const approvalactionModel = require('../model/approvalactionModel')
const nodemailer = require('nodemailer');
const aqp = require('api-query-params');

const _post = async(req,res) => {
    const record = req.body;
    console.log(req.body)
    try {
        let response = await approvalModel.create(record);
        const mailOptions = {
            from: 'hari95nn@outlook.com',
            to: 'recipient@example.com', 
            subject: 'New Approval Request',
            text: 'A new approval request has been created.'
        };
        transport.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        return res.status(403).send(error)
    }
}

const _get = async(req,res) => {
    try {
        // let response = await approvalModel.find().populate('group');
        const { filter, skip, limit, sort, projection } = aqp(req.query);
        let response =  await approvalModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate("group").populate("approval.approver.user");
        let totalcount = await approvalModel.countDocuments(filter);
        return res.status(201).send({response,totalcount});

    } catch (error) {
        console.log(error);
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


const editRecord = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedRecord = await approvalModel.findByIdAndUpdate(id);
  
      if (!updatedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      return res.status(200).json(updatedRecord);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};
 
const transport = nodemailer.createTransport({
    pool: true,
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'hari95nn@outlook.com',
      pass: 'Hari@123,,'
    }
}); 


module.exports = {
    _post,
    _get,
    findbyId,
    findbyIdanddelete,
    findbyIdandUpdate,
    leaveRequest,
    editRecord,
    transport
}