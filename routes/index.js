
const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const usergroupRoute = require('./usergroupRoute')
const clientRoute = require("./clientRoute")
const countryCode = require("./countryCode")
const roleRoute = require('./roleRoute')

//user path
router.use('/user',userRoute);
router.use('/group',usergroupRoute);
router.use('/client',clientRoute);
router.use('/countrycode',countryCode);
router.use('/role',roleRoute)


module.exports = router;