
const express = require('express');
const countryCodeRouter = express.Router();
const CountryCodeController = require('../controller/countryCodeController');


// countryCodeRouter.get('/',CountryCodeController.sendCountryCode);


module.exports = countryCodeRouter;