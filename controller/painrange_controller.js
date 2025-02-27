const PainrangeServices = require('../services/painrange_services');

exports.create = async(req, res, next)=>{
    try{
        const{email,painrange,session} = req.body;

        const successRes = await PainrangeServices.range(email,painrange,session);

        res.json({status: true, success: " Submittted Successfully"});

    }catch(error){
        throw error
    }
}

exports.Update = async (req,res, next) => {
    try {
        const { email,painrange,session} = req.body;
        const updateData = await PainrangeServices.update(email,painrange,session);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }
}

exports.getData = async(req,res,next) => {
    try {
        const {email} = req.query;
        const User = await PainrangeServices.getemail(email);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}

exports.delete = async(req, res, next)=>{
    try{
        const{email} = req.query;
        const range = await PainrangeServices.deletepainrange(email);
        res.status(200).json(range)
    }catch(error){
        next(error)
    }
}