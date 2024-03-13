const express = require('express');
const userRouter = express.Router();

const userController = require('../controller/userController');

userRouter.post('/',userController._post);
userRouter.get('/',userController._get);
userRouter.get('/:id',userController.findbyId);
userRouter.delete('/:id',userController.findbyIdanddelete);
userRouter.patch('/:id',userController.findbyIdandUpdate);



module.exports = userRouter;