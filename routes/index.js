
const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const usergroupRoute = require('./usergroupRoute');
const clientRoute = require("./clientRoute");
const attendanceRoute = require('./attendanceRoute');


//user path
router.use('/user',userRoute);
router.use('/group',usergroupRoute);
router.use('/client',clientRoute);
router.use('/attendance',attendanceRoute);

module.exports = router;