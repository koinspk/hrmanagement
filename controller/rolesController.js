const rolegroupModel = require('../model/role');
const aqp = require('api-query-params');

const _post = async(req,res) => {
    const record = req.body;
    try {
        let response = await rolegroupModel.create(record);
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        return res.status(403).send(error)
    }
}



const _get = async(req,res) => {
    try {
        const { limit, skip } = aqp(req.query);
        let response = await rolegroupModel.find().limit(limit).skip(skip);
        let totalcount = await rolegroupModel.countDocuments()
        return res.status(201).send({response,totalcount});
    } catch (error) {
        return res.status(403).send(error)
    }
    
}


const findbyId = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await rolegroupModel.findById(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdanddelete = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await rolegroupModel.findByIdAndDelete(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdandUpdate = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await rolegroupModel.findByIdAndUpdate(id,req.body);
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
}