const express =  require('express');
const companyRouter = express.Router();
const company = require('../controller/companyController');
const upload = require('../helpers/multerConfig')

companyRouter.post('/',company._post);
companyRouter.get('/',company._get);
companyRouter.get('/:id',company.findbyId);
companyRouter.delete('/:id',company.findbyIdanddelete);
companyRouter.patch('/:id',company.findbyIdandUpdate);
companyRouter.post('/upload',upload.single('logo'),company.logoUpload);

module.exports =companyRouter