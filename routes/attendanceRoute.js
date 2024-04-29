const express = require('express');
const userRouter = express.Router();

const attendanceController = require('../controller/attendanceController');
const { working_hours } = require('../controller/attendanceController');

userRouter.post('/',attendanceController.working_hours);
userRouter.get('/',attendanceController._get);
userRouter.get('/:id',attendanceController.findbyId);
userRouter.delete('/:id',attendanceController.findbyIdanddelete);
userRouter.patch('/:id',attendanceController.findbyIdandUpdate);


module.exports = userRouter;