
const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const usergroupRoute = require('./usergroupRoute')
const clientRoute = require("./clientRoute")



//user path
router.use('/user',userRoute);
router.use('/group',usergroupRoute);
router.use('/client',clientRoute);



module.exports = router;