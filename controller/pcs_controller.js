const PcsServices = require("../services/pcs_services")

exports.submitPcsAnswer = async(req, res, next)=>{
    try{
        const{email,S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,date,time} = req.body;

        const successRes = await PcsServices.pcsAnswers(email,S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,date,time);

        res.json({status: true, success: "Answer Submitted Successfully"});

    }catch(error){
        throw error
    }
}
exports.fetpcs = async(req, res, next)=>{
    try{
        const{email} = req.body;
        const patient = await PcsServices.checkuser(email);
        if(!patient){
            res.status(200).json({status:false, message: "Not Answer"})
        }else{
        
        res.status(200).json({status:true, id: patient._id})      
    }
    }catch(error){
        res.status(200).json({status:false, message: error})

    }
}

exports.Update = async (req,res, next) => {
    try {
        const { email,S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,date,time} = req.body;
        const updateData = await PcsServices.update(email,S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,date,time);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }
}

exports.getEmail = async(req,res,next) => {
    try {
        const {email} = req.query;
        const pcs = await PcsServices.getpcs(email);
        res.status(200).json(pcs)
    } catch (error) {
        next(error);
    }
}

exports.delete = async(req, res, next)=>{
    try{
        const{email} = req.query;
        const pcs = await PcsServices.deletepcs(email);
        res.status(200).json(pcs)
    }catch(error){
        next(error)
    }
}

exports.getData = async(req, res) => {
    try {
      const email = req.query.email;
      const detail = await PcsServices.getDataByEmail(email);
      res.status(200).send(detail);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
