const express = require('express');
const userRouter = express.Router();

const clientController = require('../controller/clientController');

userRouter.post('/',clientController._post);
userRouter.get('/',clientController._get);
userRouter.get('/:id',clientController.findbyId);
userRouter.delete('/:id',clientController.findbyIdanddelete);
userRouter.patch('/:id',clientController.findbyIdandUpdate);

module.exports = userRouter;