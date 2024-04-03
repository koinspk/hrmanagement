const express = require('express');
const userRouter = express.Router();

const attendanceController = require('../controller/attendanceController');
const { working_hours } = require('../controller/attendanceController');

userRouter.post('/',attendanceController.working_hours);
userRouter.get('/',attendanceController.working_hours);
userRouter.get('/:id',attendanceController.working_hours);
userRouter.delete('/:id',attendanceController.findbyIdanddelete);


module.exports = userRouter;

