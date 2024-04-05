const companyModel = require('../model/company');

const _post = async(req,res) => {
    const record = req.body;
    try {
        let response = await companyModel.create(record);
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        return res.status(403).send(error)
    }
}



const _get = async(req,res) => {
    try {
        
        let response = await companyModel.find();
        let totalcount = await companyModel.countDocuments()
        return res.status(201).send({response,totalcount});
    } catch (error) {
        return res.status(403).send(error)
    }
    
}


const findbyId = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await companyModel.findById(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdanddelete = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await companyModel.findByIdAndDelete(id);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
    }
}


const findbyIdandUpdate = async(req,res) => {
    try {
        const { id } = req.params;
        let response = await companyModel.findByIdAndUpdate(id,req.body);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(403).send(error)
}
}

const logoUpload = async (req, res) => {
    try {
      const companyData = {
        name: req.body.name,
        location: req.body.location,
        website: req.body.website,
        CompanyStarttime: req.body.CompanyStarttime,
        Endtime: req.body.Endtime,
        StartofWeek: req.body.StartofWeek,
        EndofWeek: req.body.EndofWeek,
        profile: req?.files[0] ?.path?? ''
      };
    //   console.log(req.files)
    //   console.log(req)
      const newCompany = await new companyModel(companyData);
      await newCompany.save();
  
      res.status(201).send('Company created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }


module.exports = {
    _post,
    _get,
    findbyId,
    findbyIdanddelete,
    findbyIdandUpdate,
    logoUpload
}