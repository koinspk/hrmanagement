const express = require('express');
const userRouter = express.Router();

const usergroupController = require('../controller/usergroupController');

userRouter.post('/',usergroupController._post);
userRouter.get('/',usergroupController._get);
userRouter.get('/:id',usergroupController.findbyId);
userRouter.delete('/:id',usergroupController.findbyIdanddelete);
userRouter.patch('/:id',usergroupController.findbyIdandUpdate);


module.exports = userRouter;