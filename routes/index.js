
const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const usergroupRoute = require('./usergroupRoute');
const clientRoute = require("./clientRoute");
const attendanceRoute = require('./attendanceRoute');

const countryCode = require("./countryCode");
const roleRoute = require('./roleRoute');
const companyRoute = require('./companyRoute');

//user path
router.use('/user',userRoute);
router.use('/group',usergroupRoute);
router.use('/client',clientRoute);
router.use('/attendance',attendanceRoute);
router.use('/countrycode',countryCode);
router.use('/role',roleRoute);
router.use('/company',companyRoute);


module.exports = router;