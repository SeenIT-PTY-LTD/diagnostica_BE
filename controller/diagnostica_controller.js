const DiagnosticaServices = require('../services/diagnostica_services');

exports.create = async(req, res, next)=>{
    try{
        const{data,email,comment,doctor,date,time} = req.body;

        const successRes = await DiagnosticaServices.data(data,email,comment,doctor,date,time);

        res.json({status: true, success: " Submittted Successfully"});

    }catch(error){
        throw error
    }
}

exports.getData = async(req, res) => {
    try {
      const email = req.query.email;
      const detail = await DiagnosticaServices.getDataByEmail(email);
      res.status(200).send(detail);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  exports.delete = async(req, res, next)=>{
    try{
        const{email} = req.query;
        const data = await DiagnosticaServices.deletedata(email);
        res.status(200).json(data)
    }catch(error){
        next(error)
    }
}