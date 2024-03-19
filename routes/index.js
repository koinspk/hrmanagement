
const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const usergroupRoute = require('./usergroupRoute')

router.use('/user',userRoute);
router.use('/group',usergroupRoute);

module.exports = router;