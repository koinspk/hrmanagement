const express = require('express');
const userRouter = express.Router();

const approvalController = require('../controller/approvalController');

userRouter.post('/',approvalController._post);
userRouter.get('/',approvalController._get);
userRouter.get('/:id',approvalController.findbyId);
userRouter.delete('/:id',approvalController.findbyIdanddelete);
userRouter.patch('/:id',approvalController.findbyIdandUpdate);

module.exports = userRouter;