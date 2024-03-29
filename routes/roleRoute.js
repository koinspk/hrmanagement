const express = require('express');
const roleRouter = express.Router();

const roleController = require("../controller/rolesController");

roleRouter.post('/',roleController._post);
roleRouter.get('/',roleController._get);
roleRouter.get('/:id',roleController.findbyId);
roleRouter.delete('/:id',roleController.findbyIdanddelete);
roleRouter.patch('/:id',roleController.findbyIdandUpdate);

module.exports=roleRouter