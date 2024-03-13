const userModel = require('../model/user');

const _post = async(req,res) => {
    const record = req.body;
    try {
        let response = await userModel.create(record);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}



const _get = async(req,res) => {
    try {
        let response = await userModel.find();
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
    
}


const findbyId = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await userModel.findById(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdanddelete = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await userModel.findByIdAndDelete(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdandUpdate = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await userModel.findByIdAndUpdate(id,req.body);
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
    findbyIdandUpdate
}