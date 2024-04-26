const fs = require('fs');
const path = require('path');

const _post = async (req, res) => {
    const record = req.body;
    try {
        let response = await countryCodeModel.create(record);
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        return res.status(403).send(error);
    }
}
// const jsonData = fs.readFileSync(filePath, 'utf8');
// const data = JSON.parse(jsonData);
// res.json(data);

const _get = async (req, res) => {
    try {
        let response = await countryCodeModel.find();
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }

}


const findbyId = async (req, res) => {
    try {
        const { id } = req.params;
        let response = await countryCodeModel.findById(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdanddelete = async (req, res) => {
    try {
        const { id } = req.params;
        let response = await countryCodeModel.findByIdAndDelete(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdandUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        let response = await countryCodeModel.findByIdAndUpdate(id, req.body);
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
