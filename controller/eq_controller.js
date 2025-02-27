const EqServices = require("../services/eq_services")

exports.submitEqAnswer= async(req, res, next)=>{
    try{
        const{email,eq1,eq2,eq3,eq4,eq5,eq6,date,time} = req.body;

        const successRes = await EqServices.eqAnswers(email,eq1,eq2,eq3,eq4,eq5,eq6,date,time);

        res.json({status: true, success: "EQ 56 Answer Submitted Successfully"});

    }catch(error){
        throw error
    }
}


exports.feteq = async(req, res, next)=>{
    try{
        const{email} = req.body;
        const patient = await EqServices.checkuser(email);
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
        const { email,eq1,eq2,eq3,eq4,eq5,eq6,date,time} = req.body;
        const updateData = await EqServices.update(email,eq1,eq2,eq3,eq4,eq5,eq6,date,time);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }
}

exports.getEmail = async(req, res) => {
    try {
      const email = req.query.email;
      const detail = await EqServices.geteq(email);
      res.status(200).send(detail);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

exports.delete = async(req, res, next)=>{
    try{
        const{email} = req.query;
        const eq = await EqServices.deleteeq(email);
        res.status(200).json(eq)
    }catch(error){
        next(error)
    }
}