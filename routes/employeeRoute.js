const express = require('express');
const userRouter = express.Router();

const employeeController = require('../controller/employeeController');
const { working_hours } = require('../controller/employeeController');

userRouter.post('/',employeeController._post);
userRouter.get('/',employeeController._get);
userRouter.get('/:id',employeeController.findbyId);
userRouter.delete('/:id',employeeController.findbyIdanddelete);
userRouter.patch('/:id',employeeController.findbyIdandUpdate);
userRouter.post('/calculate-working-hours', working_hours);
userRouter.get('/calculate-working-hours',working_hours);
userRouter.delete('/calculate-working-hours',working_hours);

module.exports = userRouter;