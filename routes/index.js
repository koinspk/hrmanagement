
const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const usergroupRoute = require('./usergroupRoute');
const clientRoute = require("./clientRoute");
const attendanceRoute = require('./attendanceRoute');
const approvalRoute = require('./approvalRoute');
const countryCode = require("./countryCode");
const roleRoute = require('./roleRoute');
const companyRoute = require('./companyRoute');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');

//user path
router.use('/user',userRoute);
router.use('/group',usergroupRoute);
router.use('/client',clientRoute);
router.use('/attendance',attendanceRoute);
router.use('/countrycode',countryCode);
router.use('/role',roleRoute);
router.use('/company',companyRoute);
router.use('/approval',approvalRoute);
router.use('/sendmail',SendmailTransport)


module.exports = router;